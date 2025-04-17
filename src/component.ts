import { ensureDirSync } from "https://deno.land/std@0.114.0/fs/ensure_dir.ts";
import { bold, green } from "https://deno.land/std@0.114.0/fmt/colors.ts";
import { getPathsAndNames } from "./utils.ts";
import { getComponentContent } from "./template.ts";
import { Config } from "./types/config.ts";

function createComponent(
  config: Config,
  argv: Record<string, boolean>,
  componentPath: string,
  componentName: string,
  flat: boolean,
) {
  const { component: { name, fnName, dir, file }, barrelFile, styles } =
    getPathsAndNames(componentPath, componentName, flat, config);

  ensureDirSync(dir);

  Deno.writeTextFileSync(
    file,
    getComponentContent(fnName, name, config, argv.styles, styles.name),
  );
  if (!flat && config.barrels && argv.barrels) {
    Deno.writeTextFileSync(barrelFile, `export { ${fnName} } from './${name}'`);
  }
  if (argv.styles) {
    Deno.writeTextFileSync(styles.file, ".container {}");
  }

  console.log(green(`Component ${bold(componentPath)} created successfully.`));
}

export { createComponent };
