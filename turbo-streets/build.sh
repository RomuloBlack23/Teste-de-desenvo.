#!/bin/sh
# Gera index.html standalone a partir de game.html (fragmento usado no Artifact)
cd "$(dirname "$0")"
{ printf '%s\n' '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"></head><body>'; cat game.html; printf '%s\n' '</body></html>'; } > index.html
