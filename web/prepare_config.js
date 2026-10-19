// AgriAI Build Helper: Generate dynamic runtime config.js
const fs = require("fs");
const path = require("path");

const apiBase = process.env.API_BASE || "https://ipbl-p70f.onrender.com";

const content = `window.API_BASE = "${apiBase}";\n`;

const targetRoot = path.join(__dirname, "config.js");
const targetJsDir = path.join(__dirname, "js");
const targetJsConfig = path.join(targetJsDir, "config.js");

fs.writeFileSync(targetRoot, content);
if (fs.existsSync(targetJsDir)) {
    fs.writeFileSync(targetJsConfig, content);
}

console.log("config.js generated successfully");