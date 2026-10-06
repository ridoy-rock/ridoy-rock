#!/usr/bin/env bash
# Build the site for GitHub Pages (https://ridoy-rock.github.io/ridoy-rock/) and push it to the gh-pages branch.
# The current branch and working tree are left untouched. Run from anywhere inside the repo.
set -euo pipefail

web_dir="$(cd "$(dirname "$0")/.." && pwd)"
repo_dir="$(git -C "$web_dir" rev-parse --show-toplevel)"
site_dir="$(mktemp -d)"
index_file="$(mktemp -u)"
trap 'rm -rf "$site_dir" "$index_file"' EXIT

cd "$web_dir"
npm run build:pages
cp -r out/. "$site_dir/"
touch "$site_dir/.nojekyll"   # otherwise GitHub's Jekyll step drops the _next/ folder

cd "$repo_dir"
git fetch -q origin gh-pages || true
parent_args=()
if git rev-parse -q --verify origin/gh-pages >/dev/null; then
  parent_args=(-p origin/gh-pages)
fi

GIT_INDEX_FILE="$index_file" git --work-tree="$site_dir" add -A .
tree="$(GIT_INDEX_FILE="$index_file" git write-tree)"
commit="$(git commit-tree "$tree" "${parent_args[@]}" -m "Deploy landing page (built from $(git rev-parse --short HEAD))")"
git push origin "$commit:refs/heads/gh-pages"

# Leave out/ as a normal (root-path) build for local previews.
cd "$web_dir" && npm run build >/dev/null
echo "Deployed $commit to gh-pages"
