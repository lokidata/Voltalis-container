<div id="top"></div>

# Voltalis Bridge (Container Version)

This project is a fork of [zaosoula/ha-addons](https://github.com/zaosoula/ha-addons).

**This version allows you to run Voltalis Bridge as a standalone container, instead of a Home Assistant add-on.**

The bridge can be used to monitor consumption and enable/disable devices from Voltalis in your Home Assistant setup.

[![CI](https://github.com/lokidata/Voltalis-container/actions/workflows/ci.yml/badge.svg)](https://github.com/lokidata/Voltalis-container/actions/workflows/ci.yml)
[![CodeQL](https://github.com/lokidata/Voltalis-container/actions/workflows/codeql.yml/badge.svg)](https://github.com/lokidata/Voltalis-container/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/lokidata/Voltalis-container/badge)](https://scorecard.dev/viewer/?uri=github.com/lokidata/Voltalis-container)

## Usage as a Container

The image is published (signed) on GHCR: `ghcr.io/lokidata/voltalis-container`.

Required environment variables (see `.env.example`):

- `VOLTALIS_USERNAME` / `VOLTALIS_PASSWORD`: your Voltalis account
- `HA_URL`: base URL of Home Assistant (e.g. `http://192.168.1.100:8123`, with or without `/api`)
- `HA_TOKEN`: a Home Assistant long-lived access token

```sh
cp .env.example .env   # then fill it in
docker compose up -d
```

`docker-compose.yml` runs the container hardened (non-root, read-only, no capabilities). To build locally: `docker build -t voltalis-bridge .`

## Development

```sh
nvm use && npm ci
npm run dev      # needs a .env
npm run check    # lint, format, typecheck, tests + coverage, build, audit
```

Tests come first (Vitest). See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

## Notes

- This container does not require Home Assistant Supervisor.
- The `HA_URL` can be provided with or without `/api` at the end; the bridge will handle it automatically.
- Make sure your Home Assistant token has API access rights.

---

## Acknowledgments

- [zaosoula/ha-addons](https://github.com/zaosoula/ha-addons) (original project)
- [Ring-bridge by Helmut Hoffer von Ankershoffen](https://github.com/helmut-hoffer-von-ankershoffen/hassio-ring-bridge)
- [Hassion-addons by Kris De Winter](https://github.com/kdw2060/hassio-addons)
- [Voltalis-cli by Ivo Bellin Salarin](https://github.com/nilleb/voltalis-cli)

<p align="right">(<a href="#top">back to top</a>)</p>
