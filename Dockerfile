FROM node:22-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
RUN npm ci --ignore-scripts
COPY src/ ./src/
RUN npm run build && npm prune --omit=dev --ignore-scripts

FROM node:22-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914
WORKDIR /app
ENV NODE_ENV=production DEBUG=voltalis-bridge*
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY entrypoint.sh ./
# npm/yarn are not needed at runtime and ship their own vulnerable bundled deps
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /opt/yarn*
# Fixed packages that the pinned base does not have yet (openssl, zlib); Dependabot moves the base forward.
USER root
RUN apk upgrade --no-cache libcrypto3 libssl3 zlib
# Healthy while a poller fetched successfully in the last 2 minutes (src/lib/poller.ts touches /tmp/heartbeat; the 5 s poller keeps it fresh).
HEALTHCHECK --interval=60s --timeout=5s --start-period=2m --retries=3 \
  CMD test -n "$(find /tmp/heartbeat -mmin -2 2>/dev/null)" || exit 1
USER node
ENTRYPOINT ["./entrypoint.sh"]
