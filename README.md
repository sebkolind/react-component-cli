# React Component CLI

A CLI tool to generate React components with ease.

## Features

- Generate React components with customizable templates
- Supports different case formats for component names
- Automatically creates style files and index files

## Installation

### Installation

```sh
# Using Deno
deno install -A -n rcc jsr:@sebkolind/react-component-cli

# Using npm
npx jsr add @sebkolind/react-component-cli
```

## Usage

```sh
rcc <component-name>/<sub-component-name> [/<sub-component-name> ...]
```

## Configuration

Create a configuration file at `~/.config/@sebkolind/rcc/config.yml` to customize the
generated files.

More details about the configuration file can be found [here](https://github.com/sebkolind/react-component-cli/blob/main/src/types/config.ts).

### Default Configuration

```yml
mainFile:
  path: ""
  prefix: ""
  extension: ".tsx"
  caseFormat: "PascalCase"
styleFile:
  path: ""
  prefix: ""
  extension: ".module.scss"
  nameFromComponent: true
barrelFiles:
  extension: ".ts"
```
