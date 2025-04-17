import {
  camelCase,
  paramCase,
  pascalCase,
} from "https://deno.land/x/case@2.2.0/mod.ts";
import { join } from "https://deno.land/std@0.114.0/path/mod.ts";
import { CaseFormat, Config } from "./types/config.ts";
import { PathsAndNames } from "./types/paths.ts";

/** Formats a component name according to the specified case format */
function formatComponentName(
  name: string,
  caseFormat: CaseFormat,
): string {
  switch (caseFormat) {
    case "kebab-case":
      return paramCase(name);
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

/** Sanitizes a component name by removing special characters */
// TODO Don't sanitize if the folder name should be kebab-case. Find a way to handle this case, where folder name is kebab-case, and component name is PascalCase
function sanitizeComponentName(name: string): string {
  return name.replace(/[-_]/g, "");
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
