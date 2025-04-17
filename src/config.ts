import { join } from "https://deno.land/std@0.114.0/path/mod.ts";
import { parse } from "https://deno.land/std@0.114.0/encoding/yaml.ts";
import merge from "npm:lodash.merge";
import { Config } from "./types/config.ts";

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
