#!/usr/bin/env

import { join } from "https://deno.land/std@0.114.0/path/mod.ts";
import { parse } from "https://deno.land/std@0.114.0/flags/mod.ts";
import { red } from "https://deno.land/std@0.114.0/fmt/colors.ts";
import { loadConfig } from "./config.ts";
import { createComponent } from "./component.ts";

const argv = parse(Deno.args, {
  boolean: ["styles", "barrels", "flat"],
  default: {
    barrels: true,
    styles: true,
    flat: false,
  },
});

if (argv._.length === 0) {
  console.error(
    red(
      "Usage: rcc <component-name>/<sub-component-name>[,<sub-component-name>...] ...",
    ),
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
      const components = path.split(",");
      for (const component of components) {
        const currentPath = basePath ? join(basePath, component) : component;
        createComponent(config, argv, currentPath, component, false);
      }
      basePath = join(basePath, path.split(",")[0]);
    }
  }
}

export { createComponent };
