@ -0,0 +1,13 @@
#!/bin/sh
# Script d'entrée pour Voltalis Bridge en mode container
set -eu

if [ -z "${VOLTALIS_USERNAME:-}" ] || [ -z "${VOLTALIS_PASSWORD:-}" ]; then
  echo "Erreur : Les variables d'environnement VOLTALIS_USERNAME et VOLTALIS_PASSWORD doivent être définies."
  exit 1
fi

echo "Démarrage du service Voltalis Bridge..."
export NODE_ENV=production
export DEBUG="voltalis-bridge*"
yarn start