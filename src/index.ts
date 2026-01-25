/**
 * FastMCP Edge Demo - Cloudflare Workers
 *
 * A demonstration of FastMCP running on Cloudflare Workers edge runtime.
 * Deployed at: https://fastmcp.jordanhburke.com
 *
 * Features demonstrated:
 * - MCP Tools, Resources, and Prompts
 * - Custom HTTP routes alongside MCP endpoints (Issue #160)
 */

import { EdgeFastMCP } from "@jordanburke/fastmcp/edge"
import { z } from "zod"

const server = new EdgeFastMCP({
  description: "FastMCP demo running on Cloudflare Workers edge runtime",
  name: "FastMCP Edge Demo",
  version: "1.0.0",
})

// =============================================================================
// CUSTOM HTTP ROUTES (Issue #160)
// Access the underlying Hono app to add REST endpoints alongside MCP
// =============================================================================

const app = server.getApp()

// Landing page with documentation
app.get("/", (c) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FastMCP Edge Demo</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; background: #0a0a0a; color: #e5e5e5; }
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .subtitle { color: #888; margin-bottom: 2rem; }
    .badge { display: inline-block; background: #1a1a2e; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; color: #667eea; margin-right: 0.5rem; }
    section { background: #111; border: 1px solid #222; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem; }
    h2 { font-size: 1.25rem; margin-bottom: 1rem; color: #fff; }
    .endpoint { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; border-bottom: 1px solid #222; }
    .endpoint:last-child { border-bottom: none; }
    .method { font-weight: 600; font-size: 0.75rem; padding: 0.125rem 0.5rem; border-radius: 0.25rem; }
    .get { background: #065f46; color: #6ee7b7; }
    .post { background: #1e40af; color: #93c5fd; }
    .path { font-family: monospace; color: #a5b4fc; }
    .desc { color: #888; font-size: 0.875rem; margin-left: auto; text-align: right; }
    .issue-tag { font-size: 0.625rem; padding: 0.125rem 0.375rem; border-radius: 0.25rem; margin-left: 0.5rem; font-weight: 600; }
    .issue-136 { background: #7c3aed; color: #e9d5ff; }
    .issue-160 { background: #0891b2; color: #cffafe; }
    code { background: #1a1a2e; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; }
    pre { background: #1a1a2e; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; font-size: 0.875rem; }
    a { color: #667eea; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .feature { background: #1a1a2e; padding: 1rem; border-radius: 0.5rem; }
    .feature h3 { font-size: 1rem; margin-bottom: 0.5rem; }
    .feature p { font-size: 0.875rem; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <h1>FastMCP Edge Demo</h1>
    <p class="subtitle">MCP server running on Cloudflare Workers</p>
    <div style="margin-bottom: 2rem;">
      <span class="badge">Edge Runtime</span>
      <span class="badge">Stateless</span>
      <span class="badge">V8 Isolates</span>
    </div>

    <section>
      <h2>Features Demonstrated</h2>
      <div class="features">
        <div class="feature">
          <h3>MCP Tools</h3>
          <p>greet, echo, get_datetime</p>
        </div>
        <div class="feature">
          <h3>MCP Resources</h3>
          <p>Server info, project docs</p>
        </div>
        <div class="feature">
          <h3>MCP Prompts</h3>
          <p>Code analysis template</p>
        </div>
        <div class="feature">
          <h3>Custom Routes</h3>
          <p>REST API alongside MCP</p>
        </div>
      </div>
    </section>

    <section>
      <h2>HTTP Endpoints</h2>
      <p style="font-size: 0.75rem; color: #666; margin-bottom: 1rem;">
        <span class="issue-tag issue-136">#136</span> Cloudflare Workers support
        <span class="issue-tag issue-160" style="margin-left: 1rem;">#160</span> Custom HTTP routes
      </p>
      <div class="endpoint"><span class="method get">GET</span> <span class="path">/</span> <span class="desc">This page<span class="issue-tag issue-160">#160</span></span></div>
      <div class="endpoint"><span class="method get">GET</span> <span class="path">/health</span> <span class="desc">Health check</span></div>
      <div class="endpoint"><span class="method get">GET</span> <span class="path">/mcp</span> <span class="desc">MCP HTTP Streamable<span class="issue-tag issue-136">#136</span></span></div>
      <div class="endpoint"><span class="method post">POST</span> <span class="path">/mcp</span> <span class="desc">MCP messages<span class="issue-tag issue-136">#136</span></span></div>
      <div class="endpoint"><span class="method get">GET</span> <span class="path">/api/info</span> <span class="desc">Server info (JSON)<span class="issue-tag issue-160">#160</span></span></div>
      <div class="endpoint"><span class="method get">GET</span> <span class="path">/api/time</span> <span class="desc">Current time<span class="issue-tag issue-160">#160</span></span></div>
    </section>

    <section>
      <h2>Connect with MCP Client</h2>
      <pre>{
  "mcpServers": {
    "fastmcp-demo": {
      "url": "https://fastmcp.jordanhburke.com/mcp"
    }
  }
}</pre>
    </section>

    <section>
      <h2>GitHub Issues Addressed</h2>
      <p style="margin-bottom: 1rem;">
        <strong><a href="https://github.com/punkpeye/fastmcp/issues/136">Issue #136</a></strong>: Cloudflare Workers support (Kent C. Dodds request)<br>
        <strong><a href="https://github.com/punkpeye/fastmcp/issues/160">Issue #160</a></strong>: Custom HTTP routes alongside MCP endpoints
      </p>
      <p>
        <a href="https://github.com/punkpeye/fastmcp">FastMCP on GitHub</a> •
        <a href="https://glama.ai/mcp">Documentation</a>
      </p>
    </section>
  </div>
</body>
</html>`
  return c.html(html)
})

// REST API endpoint - server info as JSON
app.get("/api/info", (c) => {
  return c.json({
    name: "FastMCP Edge Demo",
    version: "1.0.0",
    runtime: "Cloudflare Workers",
    features: ["tools", "resources", "prompts", "custom-routes"],
    endpoints: {
      mcp: "/mcp",
      health: "/health",
      api: "/api/*",
    },
  })
})

// REST API endpoint - current time
app.get("/api/time", (c) => {
  const tz = c.req.query("tz") ?? "UTC"
  try {
    const formatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: tz,
    }).format(new Date())
    return c.json({ timezone: tz, time: formatted, timestamp: Date.now() })
  } catch {
    return c.json({ error: `Invalid timezone: ${tz}` }, 400)
  }
})

// =============================================================================
// MCP TOOLS
// =============================================================================

// Tool: Greet someone
server.addTool({
  description: "Greet someone by name",
  execute: async ({ name }) => {
    return `Hello, ${name}! This greeting was served from the edge.`
  },
  name: "greet",
  parameters: z.object({
    name: z.string().describe("The name of the person to greet"),
  }),
})

// Tool: Echo back input
server.addTool({
  description: "Echo back the provided text",
  execute: async ({ text }) => {
    return `You said: "${text}"`
  },
  name: "echo",
  parameters: z.object({
    text: z.string().describe("The text to echo back"),
  }),
})

// Tool: Get current datetime
server.addTool({
  description: "Get the current date and time, optionally in a specific timezone",
  execute: async ({ timezone }) => {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: timezone ?? "UTC",
    }

    try {
      const formatted = new Intl.DateTimeFormat("en-US", options).format(new Date())
      return `Current time${timezone ? ` in ${timezone}` : ""}: ${formatted}`
    } catch {
      return `Invalid timezone: ${timezone}. Using UTC: ${new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(new Date())}`
    }
  },
  name: "get_datetime",
  parameters: z.object({
    timezone: z.string().optional().describe("IANA timezone (e.g., 'America/New_York', 'Europe/London')"),
  }),
})

// Resource: Server information
server.addResource({
  description: "Information about this MCP server",
  load: async () => {
    return JSON.stringify(
      {
        deployment: "Cloudflare Workers",
        description: "FastMCP Edge Demo - a stateless MCP server running on the edge",
        features: ["tools", "resources", "prompts"],
        name: "FastMCP Edge Demo",
        runtime: "Edge (V8 Isolates)",
        version: "1.0.0",
      },
      null,
      2,
    )
  },
  mimeType: "application/json",
  name: "Server Info",
  uri: "info://server",
})

// Resource: FastMCP project info
server.addResource({
  description: "Information about the FastMCP project",
  load: async () => {
    return `# FastMCP

FastMCP is a TypeScript framework for building Model Context Protocol (MCP) servers
with enhanced features beyond the official SDK.

## Key Features

- **Edge Runtime Support**: Deploy to Cloudflare Workers, Deno Deploy, and other edge platforms
- **Standard Schema Validation**: Use Zod, ArkType, or Valibot for parameter validation
- **OAuth Support**: Built-in OAuth discovery and authentication
- **Custom HTTP Routes**: Add REST endpoints alongside MCP endpoints
- **Streaming & Progress**: Built-in support for streaming output and progress reporting

## Links

- GitHub: https://github.com/punkpeye/fastmcp
- Documentation: https://glama.ai/mcp
- npm: https://www.npmjs.com/package/fastmcp

## This Demo

This demo showcases FastMCP's edge runtime capabilities, running entirely on
Cloudflare Workers with no Node.js dependencies.
`
  },
  mimeType: "text/markdown",
  name: "FastMCP Project Info",
  uri: "info://fastmcp",
})

// Prompt: Code analysis template
server.addPrompt({
  arguments: [
    { description: "The programming language of the code", name: "language", required: true },
    {
      description: "Specific area to focus on (e.g., 'performance', 'security', 'readability')",
      name: "focus",
      required: false,
    },
  ],
  description: "Generate a prompt template for analyzing code",
  load: async (args) => {
    const focusText = args.focus ? ` with a focus on ${args.focus}` : ""
    return {
      messages: [
        {
          content: {
            text: `Please analyze the following ${args.language} code${focusText}. Provide insights on:

1. Code quality and best practices
2. Potential issues or bugs
3. Suggestions for improvement
${args.focus ? `4. Specific ${args.focus} considerations` : ""}

Here is the code to analyze:`,
            type: "text",
          },
          role: "user",
        },
      ],
    }
  },
  name: "analyze_code",
})

export default server
