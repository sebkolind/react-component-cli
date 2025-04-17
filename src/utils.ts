import { camelCase, kebabCase, pascalCase } from "jsr:@luca/cases@1";
import { join } from "jsr:@std/path@1.0.8";
import type { CaseFormat, Config } from "./types/config.ts";
import type { PathsAndNames } from "./types/paths.ts";

/** Formats a component name according to the specified case format */
function formatComponentName(
  name: string,
  caseFormat: CaseFormat,
): string {
  switch (caseFormat) {
    case "kebab-case":
      return kebabCase(name);
    case "camelCase":
      return camelCase(name);
    case "PascalCase":
    default:
      return pascalCase(name);
  }
}

/** Formats a component function name according to the specified case format */
function formatComponentFnName(
  name: string,
  caseFormat: CaseFormat,
): string {
  switch (caseFormat) {
    case "camelCase":
      return camelCase(name);
    case "kebab-case":
    case "PascalCase":
    default:
      return pascalCase(name);
  }
}

/** Generates paths and names for component files based on the configuration */
function getPathsAndNames(
  path: string,
  name: string,
  flat: boolean,
  config: Config,
): PathsAndNames {
  const componentName = formatComponentName(
    name,
    config.mainFile.caseFormat,
  );
  const componentFnName = formatComponentFnName(
    name,
    config.mainFile.caseFormat,
  );
  const componentDir = flat ? Deno.cwd() : join(Deno.cwd(), path);
  const componentFile = join(
    componentDir,
    `${componentName}${config.mainFile.extension}`,
  );
  const barrelFile = flat ? "" : join(
    componentDir,
    `index${config.barrels ? config.barrels.extension : ".ts"}`,
  );
  const styleFileName = config.styleFile.nameFromComponent
    ? `${config.styleFile.prefix}${componentName}`
    : `${config.styleFile.prefix}styles`;
  const styleFile = join(
    componentDir,
    `${styleFileName}${config.styleFile.extension}`,
  );

  return {
    component: {
      name: componentName,
      fnName: componentFnName,
      dir: componentDir,
      file: componentFile,
    },
    barrelFile,
    styles: {
      name: styleFileName,
      file: styleFile,
    },
  };
}

export { getPathsAndNames };
