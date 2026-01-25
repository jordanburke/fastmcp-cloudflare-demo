# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FastMCP Edge Demo - A demonstration of FastMCP running on Cloudflare Workers edge runtime.

**Deployed at**: https://fastmcp.jordanhburke.com

This project showcases FastMCP's edge runtime capabilities, running entirely on Cloudflare Workers with no Node.js dependencies.

## Development Commands

### Code Quality (via ts-builds)

```bash
pnpm validate        # Main command: format + lint + typecheck (use before commits)

pnpm format          # Format code with Prettier
pnpm format:check    # Check formatting only

pnpm lint            # Fix ESLint issues
pnpm lint:check      # Check ESLint issues only

pnpm typecheck       # Check TypeScript types
```

### Cloudflare Workers (via wrangler)

```bash
pnpm dev             # Start local development server at http://localhost:8787
pnpm deploy          # Deploy to Cloudflare Workers
pnpm tail            # Stream logs from deployed worker
```

## Architecture

### Runtime: Cloudflare Workers (V8 Isolates)

- **EdgeFastMCP**: Edge-compatible FastMCP class from `@jordanburke/fastmcp/edge`
- **Stateless**: No session persistence - each request is independent
- **wrangler**: Cloudflare's CLI for local dev and deployment

### Build System

- **ts-builds**: Provides lint/format/typecheck tooling
- **wrangler**: Handles bundling and deployment (not tsdown)
- **TypeScript**: `tsconfig.json` extends `ts-builds/tsconfig` with Cloudflare types

## Key Files

- `src/index.ts` - Main server entry point with tools, resources, and prompts
- `wrangler.toml` - Cloudflare Workers configuration
- `tsconfig.json` - TypeScript config with Cloudflare Workers types

## MCP Features Demonstrated

### Tools

- `greet` - Greet someone by name
- `echo` - Echo back input text
- `get_datetime` - Get current date/time with timezone support

### Resources

- `info://server` - Server information (JSON)
- `info://fastmcp` - FastMCP project info (Markdown)

### Prompts

- `analyze_code` - Code analysis prompt template

## Testing the Deployment

```bash
# Health check
curl https://fastmcp.jordanhburke.com/health

# MCP endpoint (use with MCP client)
# SSE endpoint: https://fastmcp.jordanhburke.com/sse
```
