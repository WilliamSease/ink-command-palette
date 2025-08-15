#!/bin/bash

for arg in "$@"; do
  if [[ "$arg" == "--help" ]]; then
    echo "Ink Terminal Macros -- William Sease 2025"
    echo ""
    echo "--clean-install"
    echo "        remove ./js (compiled javascript) and ./node_modules (node packages)."
    echo "        Then a reinstall will be attempted."

    echo "--build"
    echo "        force run of tsc to compile the javascript again"
    echo "--help"
    echo "        shows this screen"
    echo ""
    echo "Complaints? github.com/williamsease/ink-terminal-macros"
    echo "WilliamSease.github.io / WilliamSoft.net"
    exit
  fi
done

for arg in "$@"; do
  if [[ "$arg" == "--clean-install" ]]; then
    echo "removing ./js/ and /node_modules directories...."
    rm -rf ./js
    rm -rf ./node_modules
  fi
done

if [ ! -d "node_modules" ]; then
  echo "node_modules not present Attempting install."
  echo "Make sure you have npm & nvm."
  npm install
  echo ""
  echo "OK!!!!!!"
fi

if [ ! -d "js" ]; then
  echo "js folder not found"
  echo "running typescript compiler via npm..."
  npm run build
  echo ""
  echo "OK!!!!!!"
fi

if [ ! -d "storage" ]; then
  echo "storage not found"
  mkdir storage
fi


for arg in "$@"; do
  if [[ "$arg" == "--build" ]]; then
    npm run build
    echo ""
    echo "OK!!!!!!"
  fi
done

# Check if node is installed
if ! command -v node &> /dev/null; then
  echo "Error: Node.js not installed."
  echo "use NVM to install Node 22."
  echo "I'm not sure how other versions of node will work with this application."
  exit 1
fi

if [[ -s toRun ]]; then
  rm toRun
fi

node ./js/cli.js

# Check if 'toRun' file exists and is not empty
if [[ -s toRun ]]; then
  CMD=$(cat toRun)
  rm toRun
  $CMD
else
  echo "No command to run."
fi