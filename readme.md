# Ink Command Pallete

> Thanks [create-ink-app](https://github.com/vadimdemedes/create-ink-app)

## Demo (todo)

https://user-images.githubusercontent.com/someLink.mp4

## Install

./run.sh will attempt the install process when you run it.

to create a terminal alias, put something like this in ~/.bashrc (replacing the path with the path of run.sh):

```
mac () {
    ~/Documents/GitHub/ink-command-pallette/run.sh ${1}
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

