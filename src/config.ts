import { join } from "jsr:@std/path@1.0.8";
import { parse } from "jsr:@std/yaml@1.0.5";
import merge from "npm:lodash.merge@4.6.2";
import type { Config } from "./types/config.ts";

const defaultConfig: Config = {
  mainFile: {
    path: "",
    prefix: "",
    extension: ".tsx",
    caseFormat: "PascalCase",
  },
  styleFile: {
    path: "",
    prefix: "",
    extension: ".module.scss",
    nameFromComponent: true,
  },
  barrels: {
    extension: ".ts",
  },
  structure: "nested",
};

function loadConfig(): Config {
  try {
    const configFile = Deno.readTextFileSync(
      // TODO Remember to change "rcc" to whatever name I choose for the CLI
      join(Deno.env.get("HOME") || "", ".config", "rcc", "config.yml"),
    );

    return merge({}, defaultConfig, parse(configFile) ?? {});
  } catch (_) {
    console.warn("Config file not found, using default values");

    return defaultConfig;
  }
}

export { defaultConfig, loadConfig };
