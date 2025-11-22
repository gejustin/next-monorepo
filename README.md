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

## Using Cursor AI to Create Module Content

This workspace includes a Cursor command that helps you quickly scaffold and implement module content using AI. This is especially useful for non-engineers who want to create learning modules without writing code manually.

### The `/create-module` Command

The Cursor command automates the entire module creation and content implementation process:

1. **Automatically runs the generator** - Executes `yarn create-module <module-name>` if the module doesn't exist
2. **Implements the content** - Generates interactive UI components based on your requirements
3. **Follows best practices** - Ensures proper server/client component separation and uses the UI library

### Example Usage

In Cursor, you can use the command like this:

```
/create-module math-basics. Create an interactive calculator and quiz for addition and subtraction
```

Or simply:

```
/create-module my-module
```

If you don't provide content requirements, Cursor will ask you what you'd like the module to teach and what interactive elements you want.

### What Happens

When you run the command:

1. **Module generation** (if needed):
   - Creates the module structure using `yarn create-module`
   - Registers the module in the module registry
   - Sets up all necessary configuration files

2. **Content implementation**:
   - Generates the server component (`module.tsx`) for data fetching
   - Creates the client component (`client-module.tsx`) with interactive UI
   - Uses components from `@learning-monorepo-poc/ui` (Card, Button, etc.)
   - Applies Tailwind CSS styling

3. **Ready to use**:
   - The module is immediately accessible at `/projects/<module-name>`
   - Just make sure `yarn dev` is running

### Example Workflow

```bash
# 1. Start the dev server (if not already running)
yarn dev

# 2. In Cursor, use the command:
/create-module security-training. Create an interactive quiz about password best practices

# 3. Cursor will:
#    - Run yarn create-module security-training
#    - Generate interactive quiz UI
#    - Register the module

# 4. View your module:
#    Navigate to http://localhost:3000/projects/security-training
```

The command is designed to be user-friendly for non-engineers - you just describe what you want, and Cursor handles all the technical implementation!
