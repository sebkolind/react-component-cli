# React Create Component CLI

A CLI tool to generate React components with ease.

## Installation

This will install the CLI tool globally under the name `rcc`.

```sh
deno install -A -n rcc jsr:@sebkolind/react-component-cli
```

## Usage

```sh
rcc <component-name>/<sub-component-name> [/<sub-component-name> ...]
```

### Arguments

- `barrels` (boolean): Generate barrel files for each component. Default: `true`
- `flat` (boolean): Generate files in a flat structure. Default: `false`
- `styles` (boolean): Generate style files for each component. Default: `true`

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
