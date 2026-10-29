# Voltalis Bridge (conteneur)

Pont Voltalis → Home Assistant : se connecte à l'API Voltalis, interroge la consommation par cron (rxjs + node-cron) et pousse des capteurs `sensor.voltalis_*` vers l'API REST de HA. Fork de zaosoula/ha-addons, exécuté en conteneur autonome (plus d'addon HA).

## Commandes

- `npm run check` : lint + format:check + typecheck + tests (couverture) + build + audit. À lancer avant de conclure.
- `npm test` / `npx vitest src/lib/sensor.test.ts` ; `npm run dev` (nécessite `.env`) ; `docker build -t voltalis-bridge .`

## Architecture

`src/config.ts` (env, exit 22 si manquant) · `src/lib/voltalis.ts` (client API) · `src/lib/homeassistant.ts` + `sensor.ts` (HA ; hors `NODE_ENV=production` les capteurs sont virtuels, aucun POST) · `src/pollers.ts` · `src/sensors.ts` · `src/index.ts`.

## Règles non négociables

1. **TDD** : test qui échoue d'abord (Vitest), code minimal pour le faire passer, puis refactor. Tout bug corrigé = un test de non-régression. Voir skill `tdd-workflow`.
2. **Sécurité** : ne jamais logger ni committer `VOLTALIS_PASSWORD`, `HA_TOKEN`, tokens, cookies, corps de réponse d'auth. Valider ce qui vient des API externes. Pas de nouvelle dépendance sans nécessité + `npm audit`. Actions et images pinnées (SHA / digest). Conteneur non-root, read-only. Voir skills `security-checklist` et `docker-hardening`, agent `security-reviewer`.
3. Les tests ne font jamais d'appel réseau réel (axios mocké).
4. Toute dérogation volontaire = commentaire `shortcut: <limite>, <quand corriger>`.
5. Réponds en français.
