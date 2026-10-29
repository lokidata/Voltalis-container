.PHONY: check gitleaks scan docker

check:
	npm run check

gitleaks:
	docker run --rm -v "$(CURDIR):/repo" ghcr.io/gitleaks/gitleaks:latest dir /repo --no-banner --redact

docker:
	docker build -t voltalis-bridge:local .

scan: docker
	trivy image --severity HIGH,CRITICAL --ignore-unfixed voltalis-bridge:local
	trivy config .
