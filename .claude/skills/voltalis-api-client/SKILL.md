---
name: voltalis-api-client
description: Use when touching src/lib/voltalis.ts or the pollers: login, token, rxjs observables, error handling.
---

# Client API Voltalis

- `login()` : POST `/auth/login`, stocke le token en mémoire (jamais sur disque, jamais loggé), puis `getCurrentUser()`. 401 → `Bad Credentials` ; autre erreur Axios → on ne logge que le **statut**, jamais le corps. Toujours `{ cause: err }`.
- Appels de données : `observableApi` (axios-observable), renvoient des Observables ; `ensureIsLoggedIn()` d'abord.
- Pollers (`src/pollers.ts`) : `poller(cron, fetchFn)` = cron → `switchMap`. Chaque `subscribe` a un `error:` qui logge `e.message` seulement.
- Données externes non fiables : vérifier la forme avant usage (ex. `consumptions.at(0)`), ne pas supposer les champs.
- Tests : mocker `axios.create` / `axios-observable` ; fixtures de réponses minimales, sans vraies données personnelles (adresse, identifiants).
