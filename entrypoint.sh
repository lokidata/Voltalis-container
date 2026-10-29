#!/bin/sh
set -eu

for v in VOLTALIS_USERNAME VOLTALIS_PASSWORD HA_URL HA_TOKEN; do
  eval "val=\${$v:-}"
  if [ -z "$val" ]; then
    echo "Erreur : la variable d'environnement $v doit être définie." >&2
    exit 1
  fi
done

echo "Démarrage du service Voltalis Bridge..."
exec node dist/index.js
