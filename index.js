import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(__dirname, "src", "index.jsx");

const child = spawn("npx", ["tsx", entry], { stdio: "inherit" });
child.on("exit", (code) => {
    process.exit(code || 0);
});
