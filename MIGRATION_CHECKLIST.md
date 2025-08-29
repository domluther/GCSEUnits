# Migration Checklist for AI Agents

Use this checklist when porting a legacy project to this React + TypeScript + Vite template.

## Pre-Migration Analysis

- [ ] **Identify project type**: SPA, MPA, static site, web app
- [ ] **List current dependencies**: Framework, libraries, build tools
- [ ] **Map existing routes**: URLs and corresponding pages/components  
- [ ] **Catalog components**: UI components, layouts, pages
- [ ] **Identify state management**: Global state, local state patterns
- [ ] **List API endpoints**: REST, GraphQL, external services
- [ ] **Note styling approach**: CSS files, preprocessors, CSS-in-JS
- [ ] **Check for tests**: Test files, testing framework used

## Migration Steps

### 1. Project Setup
- [ ] Clone this template to new directory
- [ ] Run `npm install` to install dependencies
- [ ] Copy legacy project files to `legacy/` folder for reference
- [ ] Update `package.json` name and description

### 2. Route Migration
- [ ] Map legacy routes to file-based routing structure
- [ ] Create route files in `src/routes/`:
  - [ ] `index.tsx` for home page (`/`)
  - [ ] Individual route files for each page
  - [ ] Dynamic routes using `$param.tsx` syntax
- [ ] Update `__root.tsx` with common layout elements
- [ ] Test routing with `npm run dev`

### 3. Component Migration  
- [ ] Convert class components to functional components
- [ ] Add TypeScript interfaces for props
- [ ] Update import statements to use `@/` alias
- [ ] Replace lifecycle methods with hooks:
  - [ ] `componentDidMount` → `useEffect`
  - [ ] `componentDidUpdate` → `useEffect` with dependencies
  - [ ] `this.state` → `useState`
- [ ] Test each component individually

### 4. Styling Migration
- [ ] Convert existing styles to Tailwind utilities where possible
- [ ] Move complex custom styles to `src/index.css`
- [ ] Use `cn()` utility for conditional classes
- [ ] Replace CSS modules/styled-components with Tailwind
- [ ] Test responsive behavior
- [ ] Verify dark mode compatibility (if needed)

### 5. State Management Migration
- [ ] Convert local state to `useState`/`useReducer`
- [ ] For global state, consider adding:
  - [ ] Zustand: `npm install zustand`
  - [ ] Redux Toolkit: `npm install @reduxjs/toolkit react-redux`
  - [ ] Context API with useReducer
- [ ] Update state access patterns throughout components
- [ ] Test state changes and persistence

### 6. API Integration Migration
- [ ] Update fetch calls to modern patterns
- [ ] Consider adding TanStack Query: `npm install @tanstack/react-query`
- [ ] Convert callback-based API calls to async/await
- [ ] Add proper error handling
- [ ] Update loading states
- [ ] Test API integrations

### 7. Asset Migration
- [ ] Move static assets to `public/` folder
- [ ] Update asset references to use public paths
- [ ] Optimize images if needed
- [ ] Add favicons and PWA assets if applicable

### 8. Testing Migration
- [ ] Convert existing tests to Vitest + Testing Library
- [ ] Write tests for new components using examples in `src/test/`
- [ ] Add integration tests for key user flows
- [ ] Ensure all tests pass: `npm run test:run`
- [ ] Check test coverage

### 9. Build Configuration
- [ ] Verify Vite build works: `npm run build`
- [ ] Test production preview: `npm run preview`
- [ ] Update any environment variables
- [ ] Configure deployment settings if needed

### 10. Quality Assurance
- [ ] Run linting: `npm run lint`
- [ ] Run formatting: `npm run format`
- [ ] Run type checking: `npm run type-check`
- [ ] Fix any TypeScript errors
- [ ] Test all functionality manually
- [ ] Check accessibility (basic)
- [ ] Test responsive design
- [ ] Verify performance is acceptable

## Post-Migration Tasks

### Documentation
- [ ] Update README.md with project-specific information
- [ ] Document any custom components or patterns
- [ ] Add deployment instructions
- [ ] Document environment setup

### Cleanup
- [ ] Remove legacy files after migration is complete
- [ ] Clean up unused dependencies
- [ ] Remove old build artifacts
- [ ] Update .gitignore if necessary

### Optional Enhancements
- [ ] Add PWA capabilities if needed
- [ ] Implement error boundaries
- [ ] Add analytics integration
- [ ] Set up monitoring/logging
- [ ] Optimize bundle size
- [ ] Add performance monitoring

## Common Issues & Solutions

### TypeScript Errors
- **Issue**: `Property 'x' does not exist on type 'y'`
- **Solution**: Add proper type definitions or use type assertion

### Routing Issues  
- **Issue**: Routes not matching
- **Solution**: Check file naming in `src/routes/`, ensure proper exports

### Styling Issues
- **Issue**: Styles not applying
- **Solution**: Check Tailwind class names, verify CSS imports

### State Issues
- **Issue**: State not updating
- **Solution**: Check for direct state mutation, use proper setter functions

### Build Issues
- **Issue**: Build fails
- **Solution**: Check for TypeScript errors, missing dependencies

## Testing Each Step

After each major section:
1. Run `npm run dev` and test manually
2. Run `npm run test:run` to check tests  
3. Run `npm run lint` to check code quality
4. Fix issues before proceeding

## Success Criteria

Migration is complete when:
- [ ] All original functionality works
- [ ] All routes load correctly
- [ ] No TypeScript errors
- [ ] All tests pass
- [ ] Code passes linting
- [ ] Build completes successfully
- [ ] Performance is acceptable
- [ ] Code follows modern React patterns
