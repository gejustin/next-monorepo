# Learning Monorepo POC

A Next.js monorepo workspace for building modular learning experiences.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn (v4.11.0 or higher)

### Initial Setup

1. **Install dependencies:**
   ```sh
   yarn install
   ```

2. **Start the development server:**
   ```sh
   yarn dev
   ```

   This will start the Next.js development server. The app will be available at `http://localhost:3000` (or the next available port).

3. **Build for production:**
   ```sh
   yarn build
   ```

## Creating a New Module

Use the module generator to scaffold a new learning module:

```sh
yarn create-module <module-name>
```

For example:
```sh
yarn create-module my-new-module
```

### What the Generator Does

The `yarn create-module` command automates the following steps:

1. **Creates module structure** in `modules/<module-name>/`:
   - `package.json` - Module package configuration
   - `tsconfig.json` - TypeScript configuration
   - `src/index.ts` - Module exports
   - `src/lib/module.tsx` - Server component entry point
   - `src/lib/client-module.tsx` - Client component for interactive UI
   - `README.md` - Module documentation

2. **Registers the module** in `apps/learning-monorepo-poc/app/[locale]/projects/module-registry.ts`:
   - Adds a lazy-loaded import entry for the new module
   - Enables the module to be accessed via `/projects/<module-name>`

3. **Runs post-generation tasks**:
   - Executes `yarn install` to symlink the new package
   - Runs `nx sync` to update project registrations

### Module Structure

Each module follows a consistent structure:

- **`module.tsx`** - Server component that can call server-only code (databases, APIs, etc.) and renders the client module
- **`client-module.tsx`** - Client component with `"use client"` directive for interactive UI (hooks, state, event handlers)
- **`index.ts`** - Exports the `Module` component for use in the module registry

After generation, you can customize the module content by editing these files. The module will be accessible at `/projects/<module-name>` once the dev server is running.
