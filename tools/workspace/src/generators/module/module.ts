import {
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { execSync } from 'child_process';
import { ModuleGeneratorSchema } from './schema';

function toTitleCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function moduleGenerator(tree: Tree, options: ModuleGeneratorSchema) {
  const moduleName = options.name;
  const projectRoot = `modules/${moduleName}`;
  const packageName = `@learning-monorepo-poc/${moduleName}`;
  const titleCaseName = toTitleCase(moduleName);

  // Generate files from templates
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    {
      moduleName,
      packageName,
      titleCaseName,
      tmpl: '',
    }
  );

  // Update module-registry.ts
  const registryPath =
    'apps/learning-monorepo-poc/app/[locale]/projects/module-registry.ts';
  const registryContent = tree.read(registryPath, 'utf-8');

  if (registryContent) {
    // Add import entry to registry
    const registryEntry = `  "${moduleName}": () => import("${packageName}").then(m => ({ Module: m.Module })),`;

    // Find the closing brace of the moduleRegistry object
    const lines = registryContent.split('\n');
    let insertIndex = -1;

    // Find the line with }; that closes the moduleRegistry object
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() === '};') {
        insertIndex = i;
        break;
      }
    }

    if (insertIndex > 0) {
      // Insert before the closing brace, maintaining proper formatting
      lines.splice(insertIndex, 0, registryEntry);
      tree.write(registryPath, lines.join('\n'));
    }
  }

  await formatFiles(tree);

  // Return a function that runs after the tree is written
  return async () => {
    // Run yarn install to symlink the new package
    console.log(`\n📦 Running yarn install to symlink the new package...`);
    try {
      execSync('yarn install', { stdio: 'inherit' });
      console.log(`✅ Package symlinked`);
    } catch (error: any) {
      console.error(`❌ Failed to run yarn install:`, error.message);
      throw error;
    }

    // Run nx sync to update project registrations
    console.log(`\n🔄 Running nx sync to update project registrations...`);
    try {
      // Retry once if daemon needs to restart
      try {
        execSync('npx nx sync', { stdio: 'inherit' });
      } catch (firstError: any) {
        if (firstError.message.includes('Daemon process terminated')) {
          console.log(`⚠️  Daemon restarted, retrying...`);
          execSync('npx nx sync', { stdio: 'inherit' });
        } else {
          throw firstError;
        }
      }
      console.log(`✅ Project registrations updated`);
    } catch (error: any) {
      console.error(`❌ Failed to run nx sync:`, error.message);
      console.error(`⚠️  You may need to run 'npx nx sync' manually`);
    }

    console.log(`\n✨ Module ${moduleName} is ready to use!`);
  };
}

export default moduleGenerator;
