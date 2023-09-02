#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
    echo 'Usage: [path]'
    exit 1
fi

mkdir -p "$1"

for url in $(curl https://raw.githubusercontent.com/pypi-data/data/main/links/repositories.txt); do
    git -C "$1" clone "$url" --depth=1 --no-checkout --branch=code
done

