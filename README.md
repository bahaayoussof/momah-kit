# Momah UI Components

Reusable UI components for ASP.NET Core MVC, with a documentation website built with Docusaurus.

The site lets developers find a component, read its guide, and view the full source to copy into their project.

---

## Features

- Reusable ASP.NET Core MVC components (Razor partial views, plus one JavaScript table)
- A guide and the complete source code for every component
- Components with a name/description filter and category buttons
- Documentation generated from the component folders
- Interactive Playground: **inactive**. The code in `mvc-doc/src/components/Playground/` is kept on purpose for later reactivation and is not linked from the site.

---

## Project Structure

```text
/
├── components/              # the component library (source of truth)
│   ├── _Banner/
│   │   ├── _Banner.cshtml   # the component
│   │   ├── _Banner.md       # its guide
│   │   └── image.png        # screenshots
│   ├── ...
│   └── momah-table/         # momahTable.js + CSS
└── mvc-doc/                 # this Docusaurus site
    ├── docs/
    │   ├── intro.mdx
    │   └── components/      # generated, do not edit by hand
    ├── scripts/sync-docs.js
    ├── src/
    ├── sidebars.js
    └── docusaurus.config.js
```

---

## Documentation Synchronization

`scripts/sync-docs.js` rebuilds `docs/components/` from `../components`. For each component folder it:

- copies the images
- turns the `.md` guide into the "Guide" tab
- adds one tab per `.cshtml`, `.js` and `.css` file with the full source

`docs/components/` is wiped and regenerated on every run, so edit the files under `components/`, never the generated copies. A new component also needs an entry in `sidebars.js` and in `src/pages/components/index.js`.

Run manually:

```bash
npm run presync
```

It also runs automatically before `npm start` and `npm run build`. There is no watch mode: restart `npm start` after editing a component file.

---

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

## Production Build

```bash
npm run build
```

Set the real site `url` in `docusaurus.config.js` before deploying; it is still a placeholder.

---

## Tech Stack

- ASP.NET Core MVC, Razor partial views
- Docusaurus, React, MDX, Prism
- Node.js 20+

---

## Roadmap

- [ ] Reactivate the Interactive Playground
- [ ] Additional UI components
- [ ] Accessibility improvements
- [ ] Site search
- [ ] Versioned documentation

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.
