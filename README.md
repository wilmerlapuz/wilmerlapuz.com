# Wilmer's Portfolio

Personal portfolio site built with SvelteKit, Tailwind CSS v4, and TypeScript.

## Tech Stack

- **Framework:** SvelteKit 2 with Svelte 5
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide Svelte
- **Deployment:** Vercel
- **Package Manager:** Bun (exclusively)

## Development

```fish
# Install dependencies
bun install

# Start dev server
bun run dev

# Type check
bun run check

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Svelte components
│   ├── stores/         # State management
│   └── types/          # TypeScript types
├── routes/
│   ├── api/            # API endpoints
│   └── +page.svelte    # Main page
└── app.css             # Global styles
static/                 # Static assets (JSON data files)
```

## Syncing Anki Data

To sync your Anki daily activity data to the website:

1. First, get your Anki daily activity data (this should be fetched from your MCP server)
2. Send a POST request to `/api/anki-activity` with the following format:

```bash
curl -X POST https://wilmerlapuz.com/api/anki-activity \
  -H "Content-Type: application/json" \
  -d '{
    "dailyActivity": {
      "2024-12-27": 863,
      "2024-12-26": 487,
      "2024-12-25": 98
    }
  }'
```

The API will automatically upsert the data (insert new records or update existing ones) in the Supabase database.

The website will then display this data in a GitHub-style activity grid on the stats section.

## License

MIT
