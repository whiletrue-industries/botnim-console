#!/bin/bash
git checkout main && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
npm run build && \
cp CNAME dist/console/browser/ || true && \
git add dist/console/browser && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix dist/console/browser -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout main && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout . 