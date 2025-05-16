import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { createComponent } from "../src/component.ts";
import { defaultConfig } from "../src/config.ts";
import { ensureDirSync } from "https://deno.land/std@0.114.0/fs/ensure_dir.ts";
import { parseArgs } from "jsr:@std/cli/parse-args";

function setupTest(componentPath: string) {
  ensureDirSync(componentPath);
  Deno.removeSync(componentPath, { recursive: true });
}

function assertFileExists(filePath: string, message: string) {
  try {
    Deno.statSync(filePath);
    assert(true);
  } catch {
    assert(false, message);
  }
}

function assertFileContent(filePath: string, content: string) {
  const fileContent = Deno.readTextFileSync(filePath);
  assert(fileContent.includes(content));
}

Deno.test("createComponent creates the correct folders and files", () => {
  const config = defaultConfig;
  const args = ["--styles", "--barrels"];
  const argv = parseArgs(args);
  const componentPath = "./test-component";
  const componentName = "TestComponent";

  setupTest(componentPath);
  createComponent(config, argv, componentPath, componentName);

  assertFileExists(componentPath, "Directory does not exist");
  assertFileExists(
    `${componentPath}/TestComponent.tsx`,
    "Component file does not exist",
  );
  assertFileContent(
    `${componentPath}/TestComponent.tsx`,
    "function TestComponent",
  );
  assertFileExists(`${componentPath}/index.ts`, "Barrel file does not exist");
  assertEquals(
    Deno.readTextFileSync(`${componentPath}/index.ts`),
    "export { TestComponent } from './TestComponent'",
  );
  assertFileExists(
    `${componentPath}/${componentName}.module.scss`,
    "Style file does not exist",
  );
  assertEquals(
    Deno.readTextFileSync(`${componentPath}/${componentName}.module.scss`),
    ".container {}",
  );

  Deno.removeSync(componentPath, { recursive: true });
});

Deno.test("createComponent does not create style file when styles flag is false", () => {
  const config = defaultConfig;
  const args = ["--barrels"];
  const argv = parseArgs(args);
  const componentPath = "./test-component-no-styles";
  const componentName = "TestComponentNoStyles";

  setupTest(componentPath);
  createComponent(config, argv, componentPath, componentName);

  assertFileExists(componentPath, "Directory does not exist");
  assertFileExists(
    `${componentPath}/TestComponentNoStyles.tsx`,
    "Component file does not exist",
  );
  assertFileContent(
    `${componentPath}/TestComponentNoStyles.tsx`,
    "function TestComponentNoStyles",
  );
  assertFileExists(`${componentPath}/index.ts`, "Barrel file does not exist");
  assertEquals(
    Deno.readTextFileSync(`${componentPath}/index.ts`),
    "export { TestComponentNoStyles } from './TestComponentNoStyles'",
  );

  try {
    Deno.statSync(`${componentPath}/styles.module.scss`);
    assert(false, "Style file should not exist");
  } catch {
    assert(true);
  }

  Deno.removeSync(componentPath, { recursive: true });
});
