import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GAS_VUE_PATH = path.join(__dirname, "..", "gas");
const DIST_PATH = path.join(__dirname, "..", "dist");

async function processFiles() {
  try {
    await fs.mkdir(GAS_VUE_PATH, { recursive: true });
    console.log(`[${new Date().toLocaleTimeString()}] Building GAS files...`);

    const htmlPath = path.join(DIST_PATH, "index.html");
    const htmlData = await fs.readFile(htmlPath, "utf-8");

    const $ = cheerio.load(htmlData);

    const jsSrc = $('script[type="module"]').attr("src");
    const cssHref = $('link[rel="stylesheet"]').attr("href");

    if (!jsSrc || !cssHref) {
      throw new Error("Could not find JS or CSS files in index.html. Did you run `vite build`?");
    }

    const jsPath = path.join(DIST_PATH, jsSrc.startsWith("/") ? jsSrc.slice(1) : jsSrc);
    const cssPath = path.join(DIST_PATH, cssHref.startsWith("/") ? cssHref.slice(1) : cssHref);

    const jsData = await fs.readFile(jsPath, "utf-8");
    const cssData = await fs.readFile(cssPath, "utf-8");

    // Create individual files
    const indexHtmlPath = path.join(GAS_VUE_PATH, "index.html");
    const mainJsPath = path.join(GAS_VUE_PATH, "Main.js.html"); // .js extension
    const mainCssHtmlPath = path.join(GAS_VUE_PATH, "Main.css.html"); // .html extension

    const indexHtml = `<!DOCTYPE html>
<html>
<head>
    <title>GAS Vue App</title>
    <link rel="stylesheet" href="Main.css.html">
</head>
<body>
    <div id="app"></div>
    <script src="Main.js"></script> </body>
</html>`;

    const mainJs = `${jsData}`; // No <script> tags in .js file

    const mainCssHtml = `<style>
${cssData}
</style>`;

    await Promise.all([
      fs.writeFile(indexHtmlPath, indexHtml),
      fs.writeFile(mainJsPath, mainJs), // Write Main.js
      fs.writeFile(mainCssHtmlPath, mainCssHtml),
    ]);

    console.log(`[${new Date().toLocaleTimeString()}] index.html, Main.js, and Main.css.html created.`);
    console.info(`[${new Date().toLocaleTimeString()}] Done!`);
    await fs.rm(DIST_PATH, { recursive: true, force: true });
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Error: ${error}`);
  }
}

processFiles();
