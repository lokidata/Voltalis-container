# Security policy

## Reporting a vulnerability

Please do not open a public issue. Use GitHub's private reporting:
**[Report a vulnerability](https://github.com/lokidata/Voltalis-container/security/advisories/new)**.

## Supported versions

Only the latest release (and `main`) receives security fixes.

## What is in place

- Secrets (`VOLTALIS_PASSWORD`, `HA_TOKEN`) come from environment variables only and are never logged.
- Container: non-root user, read-only filesystem, dropped capabilities, `no-new-privileges`, resource limits (see `docker-compose.yml`).
- Image: pinned base digest, production dependencies only, scanned (Trivy) before publishing, signed (cosign), SBOM and provenance attached.
- Supply chain: GitHub Actions pinned by SHA, Dependabot with a 7-day cooldown, CodeQL, dependency review, gitleaks, zizmor, OpenSSF Scorecard.
