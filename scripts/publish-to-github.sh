#!/usr/bin/env bash
# Run locally only after reviewing the code and authenticating with GitHub CLI.
# Example: ./scripts/publish-to-github.sh wulgresearch-spec private
set -euo pipefail

owner="${1:-wulgresearch-spec}"
visibility="${2:-private}"
repository="${owner}/reliability-gateway-frontend"

if [[ "$visibility" != "private" && "$visibility" != "public" ]]; then
  echo "Usage: $0 [GitHub owner] [private|public]" >&2
  exit 2
fi
if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI (https://cli.github.com/) and run: gh auth login" >&2
  exit 1
fi
if ! command -v git >/dev/null 2>&1; then
  echo "Git is required" >&2
  exit 1
fi

cd "$(dirname "$0")/.."
if [[ ! -f "package-lock.json" ]]; then
  echo "Run npm install first (generates package-lock.json for reproducible CI)." >&2
  exit 1
fi
if [[ ! -d .git ]]; then
  git init -b main
fi
git add .
if ! git diff --cached --quiet; then
  git commit -m "feat: initial Reliability Gateway frontend"
fi

if gh repo view "$repository" >/dev/null 2>&1; then
  if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "https://github.com/${repository}.git"
  fi
else
  gh repo create "$repository" "--${visibility}" --source=. --remote=origin
fi
git push -u origin main
printf '\nPushed: https://github.com/%s\n' "$repository"
