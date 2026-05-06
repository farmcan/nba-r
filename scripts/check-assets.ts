import {readFile, stat} from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const assetsDir = path.resolve(projectRoot, "public/assets");
const rasterExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const sourceFiles = [
  path.resolve(projectRoot, "scripts/build-hyperframes.ts"),
  path.resolve(projectRoot, "src/data/matchups/celtics-sixers.ts"),
  path.resolve(projectRoot, "src/themes/teams.ts"),
];

const hasPrefix = (buf: Buffer, prefix: number[]): boolean => {
  if (buf.length < prefix.length) {
    return false;
  }

  return prefix.every((value, index) => buf[index] === value);
};

const isValidRaster = (ext: string, buf: Buffer): boolean => {
  if (ext === ".jpg" || ext === ".jpeg") {
    return hasPrefix(buf, [0xff, 0xd8, 0xff]);
  }

  if (ext === ".png") {
    return hasPrefix(buf, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  }

  if (ext === ".webp") {
    return buf.length >= 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP";
  }

  if (ext === ".gif") {
    return buf.subarray(0, 6).toString("ascii") === "GIF87a" || buf.subarray(0, 6).toString("ascii") === "GIF89a";
  }

  return true;
};

const collectReferencedAssets = async (): Promise<string[]> => {
  const references = new Set<string>();
  const assetPattern = /assets\/[A-Za-z0-9/_-]+\.(?:jpg|jpeg|png|webp|gif)/g;

  for (const filePath of sourceFiles) {
    const content = await readFile(filePath, "utf8");

    for (const match of content.matchAll(assetPattern)) {
      references.add(match[0]);
    }
  }

  return [...references].map((assetPath) => path.resolve(projectRoot, "public", assetPath));
};

const main = async (): Promise<void> => {
  const dirStat = await stat(assetsDir);

  if (!dirStat.isDirectory()) {
    throw new Error(`Not a directory: ${assetsDir}`);
  }

  const files = await collectReferencedAssets();
  const failures: string[] = [];

  for (const filePath of files) {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      failures.push(path.relative(projectRoot, filePath));
      continue;
    }

    const ext = path.extname(filePath).toLowerCase();

    if (!rasterExtensions.has(ext)) {
      continue;
    }

    const buf = await readFile(filePath);

    if (!isValidRaster(ext, buf)) {
      failures.push(path.relative(projectRoot, filePath));
    }
  }

  if (failures.length > 0) {
    console.error("Invalid raster assets detected:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  process.stdout.write("Asset check passed\n");
};

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
