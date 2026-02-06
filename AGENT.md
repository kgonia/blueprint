# AGENT.md

**Project snapshot**
A JavaScript floorplanner framework and demo with a 2D (Pixi.js) editor and 3D (Three.js) viewer.

**Scope & architecture**
- The active runtime lives in `src/scripts/`. The legacy TypeScript stack under `src/` is not wired into the current demo.
- Keep changes localized and incremental. Avoid repo‑wide rewrites unless explicitly requested.

**Working agreements**
- Prefer small, focused diffs. Preserve existing APIs unless the task explicitly requires changes.
- When changing runtime behavior, update any related docs and changelog entries.
- Maintain unit consistency (cm) and use the `Dimensioning` helpers for conversions.
- When modifying serialization or versioned data, keep version strings aligned across runtime, package metadata, and docs.
- If a change touches model structure or persistence, include a minimal validation or test note in `requirements/tests.md`.

**Do / Don’t**
- Do use `rg` for search and keep edits targeted.
- Do ask for clarification when requirements conflict or are ambiguous.
- Don’t edit `node_modules/`, `build/`, or generated assets unless explicitly asked.
- Don’t introduce new dependencies without approval.

**Commands**
- `npm run app-dev` — dev build + serve demo
- `npm run app-production` — production build to `app/`
- `npm run frameworkonly-dev` — dev build of the framework to `bin/bp3djs.js`
- `npm run frameworkonly-production` — production build of the framework
- `npm run docs` — generate docs (esdoc)

**Testing**
- There is no default `npm test` in this repo. If you add tests, document how to run them and keep them headless (no WebGL requirement) unless explicitly requested.

**Documentation & requirements**
- The `requirements/` directory contains the current requirement sources. Consult it when planning changes or prioritizing fixes.
- Keep README/changelog accurate if features or behavior are modified.

**Safety**
- Avoid destructive commands and file deletions unless explicitly requested.
- If a change could break serialization, add a clear migration note in the docs.

**If your tooling expects AGENTS.md**
- Mirror or symlink this file to `AGENTS.md`.
