# 🧠 Serena Plugin Guide for foodRo

This guide explains how the **Serena Semantic Code Intelligence Plugin** (`serena-agent`) is integrated into **foodRo**, how it manages files and code symbols, and how developers and AI agents can leverage it for rapid, accurate codebase editing.

---

## 🌟 What is Serena?

**Serena** is an advanced code-intelligence and symbol-level manipulation toolkit developed by Oraios AI. Unlike raw text-based regex search tools, Serena communicates with Language Server Protocol (LSP) backends to understand code syntactically and semantically.

In `foodRo`, Serena provides:
- **Symbol-level navigation**: Jump directly to functions, components, hooks, and classes across files.
- **Accurate refactoring**: Rename symbols, replace function bodies, and insert code without breaking syntax or line numbering.
- **Semantic search**: Find usages, callers, and definitions across the React codebase.
- **Project Indexing**: Keeps an updated cache of all 24+ JavaScript/JSX source files.

---

## ⚙️ Configuration Files in foodRo

### 1. `.serena/project.yml`
Generated and maintained by Serena CLI. It declares:
```yaml
project_name: "foodRo"
language_servers:
  - typescript          # Handles JavaScript, JSX, TypeScript, and TSX
encoding: "utf-8"
ignore_all_files_in_gitignore: true
ls_workspace_folders: ["."]
read_only: false
```

### 2. `.agents/mcp_config.json`
Connects Serena as an active Model Context Protocol (MCP) server:
```json
"serena": {
  "command": "serena",
  "args": [
    "start-mcp-server",
    "--project",
    "C:\\Users\\mohit\\Desktop\\foodRo",
    "--context",
    "ide-assistant",
    "--enable-web-dashboard",
    "false",
    "--open-web-dashboard",
    "false"
  ]
}
```

---

## 🚀 Common Serena CLI Commands

### 1. Index Codebase
Re-indexes all files in the project and updates the LSP cache:
```bash
serena project index .
```
Output:
```
Indexing symbols in Project[root='foodRo', name=foodRo]
Indexed files per language: typescript=24
```

### 2. Check Project Health
Verifies LSP server status, symbol tables, and configuration validity:
```bash
serena project health-check .
```

### 3. Index a Single File
When editing or creating a new component:
```bash
serena project index-file src/components/NewComponent.jsx
```

### 4. Start MCP Server Manually
If running an external MCP client (Claude Desktop, Cursor, Zed, Antigravity):
```bash
serena start-mcp-server --project . --context ide-assistant
```

---

## 🛠️ Serena Semantic MCP Tools Reference

When connected via MCP, Serena gives AI agents and tools access to precise symbol management tools:

| Tool Name | Description | Example Usage |
| :--- | :--- | :--- |
| `find_symbol` | Search for functions, classes, components, or variables by name. | Find `PaymentQrModal` or `dbService` across all files. |
| `get_symbol_references` | Finds all locations where a symbol is imported or used. | Trace where `formatCurrency` is called. |
| `replace_symbol_body` | Replaces the inner implementation of a function/component safely. | Update `calculateDiscount` without risking syntax errors. |
| `insert_symbol` | Inserts a new function or component into an existing file cleanly. | Add a new validator function to `src/utils/validators.js`. |
| `rename_symbol` | Renames a symbol and automatically updates all references across the project. | Rename `isVerified` to `isEmailVerified` everywhere. |
| `search_for_pattern` | Semantic regex pattern search filtered by symbol types. | Search for `localStorage` occurrences within React hooks. |
| `read_memory` / `write_memory` | Serena's persistent knowledge scratchpad for architecture notes. | Store project decisions and architectural guidelines. |

---

## 💡 Best Practices for Team Development

1. **Keep `.serena/project.yml` in Git**:
   Commit `.serena/project.yml` so every team member and AI assistant shares the same project context.
2. **Re-index after major refactors**:
   Run `serena project index .` after adding large batches of components or changing module boundaries.
3. **Use Barrel Exports**:
   Serena's language server excels when modules export cleanly via `index.js` barrels (`src/components/index.js`, `src/utils/index.js`).
