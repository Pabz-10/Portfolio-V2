# Portfolio

A single-page portfolio site: a locked hero with an animated DNA helix, an
"Enter Lab" transition into normal scrolling, a "Refactored Trajectory"
statement section, a Selected Works project list, and a closing contact
section. Built with Vite + React, no UI framework — plain CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. To build for production:

```bash
npm run build
```

Output goes to `dist/`. That folder is what you deploy.

## Things to personalize before shipping

1. **`src/components/Contact.jsx`** — the `mailto:hello@example.com` link is a
   placeholder. Swap in your real contact info (email, LinkedIn, whatever you
   want linked).
2. **Resume link** — there's no resume link wired up yet anywhere. If you want
   one (e.g. in the hero top bar or the contact section), drop the PDF in
   `public/` and link to it directly (e.g. `/Pabil_Adhikari_Resume.pdf`).
3. **`index.html`** — update the `<meta name="description">` if you want
   different SEO copy.
4. **Projects** — `src/components/SelectedWorks.jsx` has the two projects we
   discussed (Running Analytics API, Discoverify) hardcoded in a `PROJECTS`
   array at the top of the file. Add a third by adding another object to that
   array — the layout handles any number of entries automatically.

## Structure

```
src/
  components/
    Helix.jsx              — the animated DNA helix (shared by Hero + rail)
    Hero.jsx / .css         — locked full-viewport intro
    RefactoredTrajectory.jsx / .css  — mid-scroll statement section
    SelectedWorks.jsx / .css         — project list
    Contact.jsx / .css               — closing section
    ScrollSections.jsx / .css        — pins one helix to the right rail
                                        while the three sections above
                                        scroll past on the left
  App.jsx                  — hero scroll-lock logic + composes everything
  index.css                — @font-face declarations, design tokens, reset
public/
  fonts/                   — PP Mori .otf files
```

## Notes on behavior

- The hero locks page scroll (`overflow: hidden` on `<body>`) until you click
  "Enter Lab —", which unlocks scrolling and smooth-scrolls down to the next
  section.
- Below the hero, one `Helix` instance is pinned via `position: sticky` in a
  right-hand rail and stays visible/animating while you scroll through
  Refactored Trajectory, Selected Works, and Contact — it only scrolls away
  once you pass the bottom of Contact.
- The helix respects `prefers-reduced-motion` and freezes on a static frame
  if that's set.
- Below 900px viewport width, the rail helix hides entirely (there isn't
  room for it next to readable text at that width) — worth revisiting if you
  want a mobile-specific treatment instead of just hiding it.
