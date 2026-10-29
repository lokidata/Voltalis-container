---
name: security-checklist
description: Use before finishing any change or opening a PR in this repo; security checklist for secrets, logs, dependencies, Docker and workflows.
---

# Checklist sécurité

- [ ] Aucun secret/token/cookie/mot de passe dans le diff, les tests, les fixtures, les logs (`debug`, `console`), les messages d'erreur.
- [ ] Les erreurs Axios ne sont jamais loggées en entier (elles embarquent headers `Authorization` et corps) : statut ou `message` seulement.
- [ ] `.env` jamais committé ; `.env.example` sans valeurs.
- [ ] Données API externes validées avant usage.
- [ ] Nouvelle dépendance ? Justifiée, maintenue, `npm audit --omit=dev` propre, `--ignore-scripts` conservé.
- [ ] Dockerfile : voir skill `docker-hardening`.
- [ ] Workflows : `permissions: {}` par défaut, actions pinnées par SHA, `persist-credentials: false`, pas d'interpolation `${{ }}` d'entrée non fiable dans `run:` (zizmor).
- [ ] `npm run check` vert ; pour un diff sensible, lancer l'agent `security-reviewer`.
