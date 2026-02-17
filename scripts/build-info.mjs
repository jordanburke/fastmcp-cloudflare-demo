import { execFileSync } from "child_process"
import { readFileSync, writeFileSync } from "fs"

const pkg = JSON.parse(readFileSync("package.json", "utf8"))

let gitSha = "unknown"
try {
  gitSha = execFileSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim()
} catch {
  // not a git repo or git not available
}

const buildTime = new Date().toISOString()

writeFileSync(
  "src/build-info.ts",
  `// Auto-generated at build time - do not edit
export const BUILD_INFO = {
  version: "${pkg.version}",
  gitSha: "${gitSha}",
  buildTime: "${buildTime}",
} as const
`,
)

console.log(`Build info: v${pkg.version} (${gitSha}) at ${buildTime}`)
