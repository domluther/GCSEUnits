
# Migration Checklist: Legacy Data Conversion Site → New Vite/React/TypeScript Template

## Goals

- [ ] Migrate File Size Calculator, Storage Calculator, and Unit Convertor features from legacy to new codebase
- [ ] Use modern React + TypeScript patterns and shared quiz logic
- [ ] UI: Main body with 3 mode-switch buttons (FileSize, Storage, UnitConvertor). Each mode presents a question requiring user input (not multiple choice)
- [ ] Use shadcn/ui components for all UI elements
- [ ] Each mode will eventually have its own route for easy sharing (e.g. `/filesize`, `/storage`, `/convert`)

---

## Migration Steps

### 1. Analyze Legacy Components
- [ ] Review `Legacy/src/components/FileSizeCalculator.tsx`, `StorageCalculator.tsx`, `UnitConvertor.tsx` for logic and question generation
- [ ] Review shared UI: `QuizComponents.tsx` (AnswerForm, FeedbackBox, ScoreBox)
- [ ] Note: Each calculator generates a question, takes user input, checks correctness, and provides feedback/explanation

### 2. Plan New Architecture
- [ ] Use a single main page/component with 3 buttons to switch modes
- [ ] Each mode renders its calculator (FileSize, Storage, UnitConvertor) using a shared input/feedback UI
- [ ] Use hooks for state and logic (`useQuizLogic` for streaks, stats, feedback)
- [ ] Use new layout (`QuizLayout.tsx`/`SiteLayout`) for consistent header/navigation

### 3. Component Migration
- [ ] Convert legacy calculators to functional components using TypeScript
- [ ] Refactor question generation and answer checking to use hooks
- [ ] Replace legacy state management with `useQuizLogic` and local state
- [ ] Use shadcn/ui primitives (from `/src/components/ui/`)

### 4. UI/UX
- [ ] Implement mode-switch buttons at the top of the main body (use shadcn `Button`)
- [ ] For each mode, show:
  - [ ] Question prompt
  - [ ] Input box for answer (use shadcn `Input`)
  - [ ] Submit button (use shadcn `Button`)
  - [ ] Feedback/explanation after submission (use shadcn `Alert`)
- [ ] Reuse/port `FeedbackBox` and input UI from legacy or new UI library

### 5. Routing
- [ ] Main route: `/` renders the calculator page with mode switching
- [ ] Add separate routes for each mode (`/filesize`, `/storage`, `/convert`) for easy sharing

### 6. Testing
- [ ] Port or write new tests for question generation, answer checking, and UI
- [ ] Use the new test setup in `/src/test/`

### 7. Cleanup
- [ ] Remove unused legacy code after migration
- [ ] Update documentation and README

---

## Next Steps

- [ ] Approve this migration guide or suggest changes
- [ ] Once approved, begin migrating the calculators and building the new main page with mode switching and input-based questions
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
- [ ] Update state access patterns throughout components
- [ ] Test state changes and persistence

### 6. API Integration Migration
- [ ] Update fetch calls to modern patterns
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
