#!/bin/bash

#!/bin/bash

# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
  echo "node_modules not present Attempting install."
  echo "Make sure you have npm & nvm."
  npm install
fi

if [ ! -d "js" ]; then
  echo "js folder not found"
  echo "running typescript compiler via npm..."
  npm run build
fi

for arg in "$@"; do
  if [[ "$arg" == "--build" ]]; then
    npm run build
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