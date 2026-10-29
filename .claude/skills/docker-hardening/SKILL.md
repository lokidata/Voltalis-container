---
name: docker-hardening
description: Use when editing Dockerfile, entrypoint.sh, docker-compose.yml or the publish workflow.
---

# Durcissement Docker

- Images de base pinnées par digest (Dependabot les met à jour). Multi-stage, `npm ci --ignore-scripts`, `npm prune --omit=dev`.
- `USER node` (non-root) ; `exec` dans `entrypoint.sh` pour que node soit PID 1 et reçoive SIGTERM ; validation des 4 variables avant démarrage.
- Compose : `read_only`, `tmpfs /tmp`, `cap_drop: [ALL]`, `no-new-privileges`, `mem_limit`, `cpus`, `pids_limit`, secrets via `env_file`, jamais dans l'image ni `ENV`.
- `.dockerignore` : `.env`, `.git`, tests, node_modules.
- Publication (`publish-image.yml`) : scan Trivy avant push, GHCR, provenance + SBOM, signature cosign ; nom d'image en minuscules.
- Vérifier : `docker build`, `docker run --entrypoint id <img>` (≠ root), run sans variables = échec propre.
