type Config = {
  /** The main component file */
  mainFile: File;
  /** The style file */
  styleFile: Omit<File, "caseFormat"> & {
    /** Whether the style file name should be the same as the component name */
    nameFromComponent: boolean;
  };
  /** The barrel file or false if not used */
  barrels: false | {
    extension: string;
  };
  /**
   * The structure of the generated files
   *
   * nested: The generated files will be nested inside a folder with the same name as the component.
   * flat: The generated files will be placed in the same folder as the component.
   */
  structure: "nested" | "flat";
};

type File = {
  /** The path of the file */
  path: string;
  /** The extension of the file */
  extension: string;
  /** The prefix of the file */
  prefix: string;
  /** The case format of the file */
  caseFormat: CaseFormat;
};

/**
 * The case format of the file
 *
 * PascalCase: The file name will be in PascalCase.
 * kebab-case: The file name will be in kebab-case.
 * camelCase: The file name will be in camelCase.
 */
type CaseFormat = "PascalCase" | "kebab-case" | "camelCase";

export type { CaseFormat, Config, File };
