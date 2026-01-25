/**
 * FastMCP Edge Demo - Cloudflare Workers
 *
 * A demonstration of FastMCP running on Cloudflare Workers edge runtime.
 * Deployed at: https://fastmcp.jordanhburke.com
 */

import { EdgeFastMCP } from "@jordanburke/fastmcp/edge"
import { z } from "zod"

const server = new EdgeFastMCP({
  description: "FastMCP demo running on Cloudflare Workers edge runtime",
  name: "FastMCP Edge Demo",
  version: "1.0.0",
})

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
