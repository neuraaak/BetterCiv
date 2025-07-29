# Coding Standards

## Language Requirements

### Documentation and Comments

**All documentation and comments MUST be written in English.**

#### Scope

- JSDoc comments
- Inline comments
- README files
- Code documentation
- API documentation
- Configuration comments

#### Examples

##### ✅ Correct (English)

```typescript
/**
 * Main store for managing translations and application state
 * Handles multilingual translations, tag and tier correspondences,
 * as well as card selection state
 */

// Get the current language from the store
const currentLang = store.getLanguage();

// TODO: Implement icon support for tags
```

##### ❌ Incorrect (French)

```typescript
/**
 * Store principal pour la gestion des traductions
 * Gère les traductions multilingues
 */

// Récupère la langue actuelle du store
const currentLang = store.getLanguage();

// TODO: Implémenter le support des icônes pour les tags
```

#### Exceptions

- User-facing text (UI labels, messages) can remain in French
- Translation data (like in the stores) can contain multiple languages
- File names and variable names can use French if they represent domain concepts

## Code Formatting

### Indentation

- Use 4 spaces for indentation
- No tabs allowed

### Line Length

- Maximum 100 characters per line
- Break long lines appropriately

### File Naming

- Use kebab-case for file names
- Use PascalCase for Vue components
- Use camelCase for variables and functions

## TypeScript Standards

### Type Definitions

- Always define types for function parameters and return values
- Use interfaces for object shapes
- Prefer `type` over `interface` for simple type aliases

### Imports

- Use ES6 import/export syntax
- Group imports: external libraries, then internal modules
- Use absolute imports with `@/` alias for src directory

## Vue.js Standards

### Component Structure

```vue
<template>
    <!-- Template content -->
</template>

<script setup lang="ts">
// Imports
import { ref, computed } from 'vue';

// Component logic
</script>

<style scoped>
/* Component styles */
</style>
```

### Props and Emits

- Always define prop types
- Use `defineEmits` for event handling
- Document complex props with JSDoc

## State Management

### Pinia Stores

- Use composition API style stores
- Separate state, getters, and actions clearly
- Document store purpose with JSDoc

### Store Naming

- Use descriptive names ending with "Store"
- Example: `translationStore`, `userStore`

## Testing Standards

### Test Files

- Place tests in `__tests__` directories
- Use `.test.ts` or `.spec.ts` extensions
- Follow AAA pattern (Arrange, Act, Assert)

## Git Standards

### Commit Messages

- Use conventional commits format
- Write commit messages in English
- Be descriptive and concise

### Branch Naming

- Use feature branches: `feature/description`
- Use fix branches: `fix/description`
- Use hotfix branches: `hotfix/description`

## Performance Standards

### Code Splitting

- Use dynamic imports for route-based code splitting
- Lazy load components when appropriate

### Bundle Size

- Monitor bundle size with build tools
- Use tree shaking effectively
- Avoid unnecessary dependencies

## Security Standards

### Input Validation

- Always validate user inputs
- Sanitize data before rendering
- Use TypeScript for type safety

### Dependencies

- Keep dependencies updated
- Audit dependencies regularly
- Use only trusted packages

## Documentation Standards

### README Files

- Write README files in English
- Include installation and usage instructions
- Document configuration options

### API Documentation

- Document all public APIs
- Include examples and use cases
- Keep documentation up to date

## Enforcement

### Tools

- ESLint for code quality
- Prettier for code formatting
- TypeScript for type checking
- cSpell for spell checking

### Code Reviews

- All code must be reviewed
- Check for English documentation
- Verify coding standards compliance
- Test functionality thoroughly
