import type { Config } from "./types/config.ts";

function getComponentContent(
  fnName: string,
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
    <div${withStyles ? ` className={styles.container}` : ""}></div>
  );
}

export { ${fnName} };
`.trim();
}

export { getComponentContent };
