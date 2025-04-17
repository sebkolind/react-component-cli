#!/usr/bin/env

import { join } from "jsr:@std/path@1.0.8";
import { parseArgs } from "jsr:@std/cli@1.0.8/parse-args";
import { loadConfig } from "./config.ts";
import { createComponent } from "./component.ts";

const argv = parseArgs(Deno.args, {
  boolean: ["styles", "barrels", "flat"],
  default: {
    barrels: true,
    styles: true,
    flat: false,
  },
});

if (argv._.length === 0) {
  console.error(
    "Usage: rcc <component-name>/<sub-component-name> ...",
  );
  Deno.exit(1);
}

const config = loadConfig();

if (argv.flat) {
  for (const arg of argv._) {
    createComponent(config, argv, "", String(arg), true);
  }
} else {
  for (const arg of argv._) {
    const paths = String(arg).split("/");
    let basePath = "";
    for (const path of paths) {
      const currentPath = basePath ? join(basePath, path) : path;
      createComponent(config, argv, currentPath, path, false);
      basePath = join(basePath, path);
    }
  }
}

export { createComponent };
