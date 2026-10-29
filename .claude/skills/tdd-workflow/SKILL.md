---
name: tdd-workflow
description: Use when adding a feature or fixing a bug in voltalis-bridge. Enforces red/green/refactor with Vitest, mocked axios and no real network.
---

# TDD (Vitest)

1. **Rouge** : écrire le test à côté du fichier (`src/**/x.test.ts`) décrivant le comportement attendu. Le lancer (`npx vitest run <fichier>`) et constater l'échec _pour la bonne raison_.
2. **Vert** : le code minimal qui passe. Rien de plus.
3. **Refactor** : nettoyer, tests toujours verts, puis `npm run check`.

Conventions du repo (voir les tests existants) :

- `vi.mock("../config", …)` pour contrôler `isProd` (hoisted via `vi.hoisted`).
- Client Voltalis : mocker `axios.create` et `axios-observable` (`voltalis.test.ts`).
- Cron : mocker `node-cron` (`poller.test.ts`), jamais d'attente réelle.
- `config.ts` quitte le process à l'import : `vi.resetModules()` + `vi.stubEnv` + spy sur `process.exit`.
- Un bug = un test qui le reproduit d'abord. Couverture minimale imposée dans `vitest.config.mts`.
- Tests sécurité : vérifier qu'aucun secret n'apparaît dans les logs (voir `config.test.ts`).
