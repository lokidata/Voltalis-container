# Contributing

`main` is protected: every change goes through a pull request that must pass the checks.

1. Branch, then make a focused change. **Test first** (TDD): write a failing Vitest test, make it pass, refactor.
2. Run `npm run check` (lint, format, typecheck, tests with coverage, build, audit).
3. Open a pull request with the template. Squash merge only.

Rules of the house:

- Never commit secrets, tokens or cookies, and never log them.
- Security-sensitive changes (credentials, logging, Docker, workflows) need a short explanation in the PR.
- Report vulnerabilities privately, see [SECURITY.md](SECURITY.md).
