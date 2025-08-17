#!/bin/bash
SOURCE_DIR=$(pwd)
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd ${SCRIPT_DIR}

for arg in "$@"; do
  if [[ "$arg" == "--help" ]]; then
    echo "Ink Command Pallete -- William Sease 2025"
    echo ""
    echo "--clean-install"
    echo "        remove ./js (compiled javascript) and ./node_modules (node packages)."
    echo "        Then a reinstall will be attempted."
    echo "--build"
    echo "        force run of tsc to compile the javascript again"
    echo "--update"
    echo "        pull the latest code from github (requires Git)"
    echo "--help"
    echo "        shows this screen"
    echo ""
    echo "Complaints? github.com/williamsease/ink-command-pallete"
    echo "WilliamSease.github.io / WilliamSoft.net"
    exit
  fi
done

for arg in "$@"; do
  if [[ "$arg" == "--update" ]]; then
    echo "updating (pulling .zip)"
    curl -L -O https://github.com/WilliamSease/ink-command-pallette/archive/refs/heads/main.zip
    unzip -l main.zip
    rm main.zip
    echo "OK :D :D :D :D"
    echo "!!! You MUST run with --clean-install to build this code and see changes."
    exit
  fi
done

for arg in "$@"; do
  if [[ "$arg" == "--clean-install" ]]; then
    echo "removing ./js/ and /node_modules directories...."
    rm -rf ./js
    rm -rf ./node_modules
    rm ./package-lock.json
  fi
done

if [ ! -d "node_modules" ]; then
  echo "node_modules not present, attempting install."
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

if [[ -s ${SCRIPT_DIR}/toRun ]]; then
  rm ${SCRIPT_DIR}/toRun
fi

node ./js/cli.js
cd ${SOURCE_DIR}

# Check if 'toRun' file exists and is not empty
if [[ -s ${SCRIPT_DIR}/toRun ]]; then
  CMD=$(cat ${SCRIPT_DIR}/toRun)
  rm ${SCRIPT_DIR}/toRun
  $CMD
else
  echo "No command to run."
fi
