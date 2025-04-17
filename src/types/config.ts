type Config = {
  mainFile: File;
  styleFile: Omit<File, "caseFormat"> & {
    /** Whether the style file name should be the same as the component name */
    nameFromComponent: boolean;
  };
  barrels: false | {
    extension: string;
  };
  structure: "nested" | "flat";
};

type File = {
  path: string;
  extension: string;
  prefix: string;
  caseFormat: CaseFormat;
};

type CaseFormat = "PascalCase" | "kebab-case" | "camelCase";

export type { CaseFormat, Config, File };
