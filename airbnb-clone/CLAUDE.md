# CLAUDE.md

Repository guidance for Claude-style coding sessions.

## What This App Is

This is a single-page Airbnb clone built with:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion

## Architecture Notes

- `src/App.tsx` is the main composition point for the page
- `src/sections` contains page sections
- `src/components` contains reusable building blocks
- `src/features` contains feature-specific UI such as modals
- `src/hooks` contains stateful logic
- `src/data` contains mock listing content

## Preferred Workflow

- Read the relevant files before changing behavior
- Match the existing component boundaries instead of flattening everything into one file
- Keep changes compatible with the current build and lint setup
- Use the existing scripts in `package.json` for validation

## Practical Notes

- The app currently favors static data and client-side state
- If you add new UI states, keep them consistent with the modal and section patterns already used
- If a change touches shared listing data, review every consumer before finishing

## Why These Files Exist

These files give AI tools a stable, local source of truth about the repo so they can:

- understand the stack quickly
- follow the project's conventions
- avoid unsafe or redundant edits
- produce changes that fit the codebase with less back-and-forth

