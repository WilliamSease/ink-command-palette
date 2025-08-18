# Ink Command Palette

> Thanks [create-ink-app](https://github.com/vadimdemedes/create-ink-app)

## Demo

https://github.com/user-attachments/assets/cb7f969c-f883-417e-91fa-4030cc88ddc3

## Download

```
curl -L -O https://github.com/WilliamSease/ink-command-palette/archive/refs/heads/main.zip
unzip main.zip -d .
rsync -a ink-command-palette-main/. ./
rm main.zip
rm -rf ./ink-command-palette-main/
```

## Install

./run.sh will attempt the install process when you run it.

to create a terminal alias, put something like this in ~/.bashrc (replacing the path with the path of run.sh):

```
mac () {
    ~/Documents/GitHub/ink-command-palette/run.sh ${1}
}
```

## Requirements

npm (assembling node_modules)

node (running the program itself)

## Usage

./run.sh

    --clean-install
            remove ./js (compiled javascript) and ./node_modules (node packages).
            Then a reinstall will be attempted.
    --build
            force run of tsc to compile the javascript again
    --update
            pull the latest code from github (requires Git)
    --help
            shows this screen

