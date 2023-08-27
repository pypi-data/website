#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
    echo 'Usage: [path]'
    exit 1
fi

git init "$1"

for url in $(curl https://raw.githubusercontent.com/pypi-data/data/main/links/repositories.txt); do
    git -C "$1" remote add "$(basename "$url")" "$url" || true
done

git -C "$1" fetch --multiple --jobs=4 --depth=1 --progress --all
