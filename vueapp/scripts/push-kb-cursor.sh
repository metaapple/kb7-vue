#!/usr/bin/env bash
# vueapp 폴더 내용을 https://github.com/metaapple/kb-cursor (브랜치 main)에 푸시합니다.
# 필요: git, rsync, GitHub HTTPS 인증.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="${TMPDIR:-/tmp}/kb-cursor-push-$$"
ORIGIN="https://github.com/metaapple/kb-cursor.git"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

if git clone --depth 1 "$ORIGIN" "$TMP" 2>/dev/null; then
  echo "→ 기존 저장소 클론됨"
  git -C "$TMP" checkout main 2>/dev/null || git -C "$TMP" checkout -b main
else
  echo "→ 빈 저장소로 초기화"
  mkdir -p "$TMP"
  git -C "$TMP" init
  git -C "$TMP" remote add origin "$ORIGIN"
  git -C "$TMP" branch -M main
fi

echo "→ 동기화: $ROOT/ (--delete 없음: .git 유지)"
rsync -a \
  --exclude node_modules \
  --exclude dist \
  --exclude .git \
  --exclude .DS_Store \
  "$ROOT/" "$TMP/"

rm -f "$TMP/vite.config 2.js" 2>/dev/null || true

cd "$TMP"
git add -A
if git diff --staged --quiet 2>/dev/null; then
  echo "커밋할 변경이 없습니다."
  exit 0
fi

git commit -m "chore: 가계부 Vue 앱 동기화"
echo "→ git push origin main"
git push -u origin main

echo "완료: https://github.com/metaapple/kb-cursor"
