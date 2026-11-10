import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "course slides", "course 1");
const publicRoot = path.join(projectRoot, "public", "course-1");
const sourceAudio = path.join(sourceRoot, "audio", "scenes");
const publicAudio = path.join(publicRoot, "audio", "scenes");

mkdirSync(publicAudio, { recursive: true });
copyFileSync(path.join(sourceRoot, "index.html"), path.join(publicRoot, "index.html"));
copyFileSync(path.join(sourceRoot, "screens.html"), path.join(publicRoot, "screens.html"));

for (const file of readdirSync(sourceAudio)) {
  if (/^scene-\d+\.wav$/i.test(file)) {
    copyFileSync(path.join(sourceAudio, file), path.join(publicAudio, file));
  }
}
