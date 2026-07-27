# AGENTS.md

This repository is a React 19 + TypeScript + Vite Airbnb clone. Use these notes when making changes with AI tools or automation.

## Project Summary

- Frontend-only application
- Styling uses Tailwind CSS plus local CSS files
- State and UI logic live in `src/hooks`, `src/sections`, `src/features`, and `src/components`
- Shared helpers live in `src/lib` and `src/utils`

## Working Rules

- Prefer small, focused changes that fit the existing component structure
- Keep TypeScript strictness intact
- Preserve the current visual language unless the user asks for a redesign
- Reuse existing helpers and components before creating new ones
- Avoid introducing unnecessary dependencies

## Common Commands

- `npm run dev` to start the local app
- `npm run build` to verify the production build
- `npm run lint` to check code quality
- `npm run format` to format the codebase

## Code Style

- Use functional React components
- Keep files and imports organized with existing project conventions
- Prefer descriptive prop names and explicit types where helpful
- Use the `cn` helper from `src/lib/utils.ts` for class merging when needed

## Change Safety

- Do not overwrite user changes outside the requested task
- Check for related files before editing a feature
- If a change affects shared UI or data structures, update dependent code in the same pass

