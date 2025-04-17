# React Component CLI

A CLI tool to generate React components with ease.

## Features

- Generate React components with customizable templates
- Supports different case formats for component names
- Automatically creates style files and index files

## Installation

```sh
deno install --allow-read --allow-write --allow-env --allow-run -n rcc https://path/to/your/cli.ts
```

## Usage

```sh
rcc <component-name>/<sub-component-name>[,<sub-component-name>...] ...
```

## Configuration

Create a configuration file at ~/.config/rcc/config.yml to customize the
generated files.

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
