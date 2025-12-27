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

## License

MIT
