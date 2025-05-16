# React Component CLI

A CLI tool to generate React components with ease.

## Features

- Generate React components with customizable templates
- Supports different case formats for component names
- Automatically creates style files and index files

## Installation

```sh
deno install -A -n rcc jsr:@sebkolind/react-component-cli
```

## Usage

```sh
rcc <component-name>/<sub-component-name> [/<sub-component-name> ...]
```

## Example

With the default configuration, which can be seen below, this command:

```sh
rcc MyComponent/MySubComponent
```

will generate the following files:

- `MyComponent.tsx`
- `MyComponent.module.scss`
- `MyComponent/index.ts`
- `MyComponent/MySubComponent/MySubComponent.tsx`
- `MyComponent/MySubComponent/MySubComponent.module.scss`
- `MyComponent/MySubComponent/index.ts`

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
structure: "nested"
```
