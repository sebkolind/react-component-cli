import { ensureDirSync } from "jsr:@std/fs@1.0.14/ensure-dir";
import { getComponentContent } from "./template.ts";
import type { Config } from "./types/config.ts";
import type { Args } from "jsr:@std/cli@1.0.8/parse-args";
import { getPathsAndNames } from "./utils.ts";

function createComponent(
  config: Config,
  argv: Args,
  componentPath: string,
  componentName: string,
  flat: boolean,
) {
  const { component: { name, fnName, dir, file }, barrelFile, styles } =
    getPathsAndNames(componentPath, componentName, flat, config);

  ensureDirSync(dir);

  Deno.writeTextFileSync(
    file,
    getComponentContent(fnName, config, argv.styles, styles.name),
  );
  if (!flat && config.barrels && argv.barrels) {
    Deno.writeTextFileSync(barrelFile, `export { ${fnName} } from './${name}'`);
  }
  if (argv.styles) {
    Deno.writeTextFileSync(styles.file, ".container {}");
  }

  console.log(`Component ${componentPath} created successfully.`);
}

export { createComponent };
