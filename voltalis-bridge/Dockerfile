# Dockerfile pour Voltalis Bridge en mode container
FROM node:20-alpine

WORKDIR /app

# Copie des fichiers nécessaires
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src/ ./src/

# Installation des dépendances et build
RUN yarn install && yarn build

# Copie du script d'entrée
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

# Variables d'environnement attendues
ENV NODE_ENV=production
ENV DEBUG=voltalis-bridge*

ENTRYPOINT ["./entrypoint.sh"]
