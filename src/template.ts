import { Config } from "./types/config.ts";
import { upperFirstCase } from "https://deno.land/x/case@2.2.0/mod.ts";

function getComponentContent(
  fnName: string,
  name: string,
  config: Config,
  withStyles: boolean,
  styleFileName: string,
): string {
  return `${
    withStyles
      ? `import styles from './${styleFileName}${config.styleFile.extension}';\n\n`
      : ""
  }
function ${fnName}() {
  return (
    <div${withStyles ? ` className={styles.container}` : ""}>
      <p>${upperFirstCase(name)}</p>
    </div>
  );
}

export { ${fnName} };
`.trim();
}

export { getComponentContent };
