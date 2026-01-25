# FastMCP Cloudflare Demo

A demonstration of [FastMCP](https://github.com/punkpeye/fastmcp) running on Cloudflare Workers edge runtime.

**Live Demo**: https://fastmcp.jordanhburke.com

## Features

- **Edge Runtime**: Runs on Cloudflare Workers V8 isolates
- **Stateless MCP**: No session persistence - each request is independent
- **Zero Node.js Dependencies**: Uses only edge-compatible APIs
- **Full MCP Support**: Tools, Resources, and Prompts

## Quick Start

```bash
# Install dependencies
pnpm install

# Start local development
pnpm dev

# Deploy to Cloudflare
pnpm deploy
```

## Development Commands

```bash
# Code quality
pnpm validate     # format + lint + typecheck
pnpm format       # Format with Prettier
pnpm lint         # Fix ESLint issues
pnpm typecheck    # Check TypeScript types

# Cloudflare Workers
pnpm dev          # Local dev server at http://localhost:8787
pnpm deploy       # Deploy to Cloudflare Workers
pnpm tail         # Stream logs from deployed worker
```

## MCP Features

### Tools

| Tool           | Description                                 |
| -------------- | ------------------------------------------- |
| `greet`        | Greet someone by name                       |
| `echo`         | Echo back input text                        |
| `get_datetime` | Get current date/time with timezone support |

### Resources

| URI              | Description                     |
| ---------------- | ------------------------------- |
| `info://server`  | Server information (JSON)       |
| `info://fastmcp` | FastMCP project info (Markdown) |

### Prompts

| Name           | Description                   |
| -------------- | ----------------------------- |
| `analyze_code` | Code analysis prompt template |

## Configuration

Edit `wrangler.toml` to configure your deployment:

```toml
name = "fastmcp-demo"
main = "src/index.ts"
compatibility_date = "2024-11-01"

[[routes]]
pattern = "your-domain.com/*"
zone_name = "your-domain.com"
```

## Testing

```bash
# Health check
curl http://localhost:8787/health

# Connect with an MCP client
# SSE endpoint: http://localhost:8787/sse
```

## Tech Stack

- [FastMCP](https://github.com/punkpeye/fastmcp) - TypeScript MCP framework
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge runtime
- [ts-builds](https://github.com/jordanburke/ts-builds) - TypeScript toolchain
- [Zod](https://zod.dev/) - Schema validation

## License

MIT
