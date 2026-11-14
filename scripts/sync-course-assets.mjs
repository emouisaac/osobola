import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "course slides", "lesson 1");
const publicRoot = path.join(projectRoot, "public", "lesson-1");
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

const lesson2Source = path.join(projectRoot, "course slides", "lesson 2");
const lesson2Public = path.join(projectRoot, "public", "lesson-2");
mkdirSync(path.join(lesson2Public, "audio"), { recursive: true });
for (const file of ["index.html", "screens.html"]) {
  copyFileSync(path.join(lesson2Source, file), path.join(lesson2Public, file));
}
copyFileSync(path.join(lesson2Source, "audio", "lesson2.mp3"), path.join(lesson2Public, "audio", "lesson2.mp3"));
const lesson2VideoPublic = path.join(lesson2Public, "video");
mkdirSync(lesson2VideoPublic, { recursive: true });
copyFileSync(path.join(projectRoot, "galary", "lesson2.mp4"), path.join(lesson2VideoPublic, "lesson2.mp4"));
