# Butterfly

Butterfly is a static browser simulation that maps user-supplied crypto commentary into reward, aversion, arousal, memory, and a MaleCNS connectome-slice activity proxy.

## Run Locally

```powershell
npm start
```

Then open:

```txt
http://localhost:4173/
```

## Static Deployment

This project can be deployed as a static site.

Recommended platforms:

- Vercel
- Cloudflare Pages
- Netlify
- GitHub Pages

For Vercel:

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Use the project root as the output directory.
4. No build command is required.

For Cloudflare Pages:

1. Push this folder to a GitHub repository.
2. Create a Pages project from the repository.
3. Leave the build command empty.
4. Use `/` as the output directory.

## Notes

- `data/malecns-candidate-slice.json` is required for the visible MaleCNS activity proxy.
- The current public version is per-browser state. Visitors do not share one butterfly yet.
- A shared global butterfly requires a backend state layer later.
