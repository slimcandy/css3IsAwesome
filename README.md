# CSS is awesome

Three drawings made only of HTML elements and CSS: a bicycle and a loader from 2015, and a rocket from 2021. In 2026 I redrew all three with modern CSS. On the page, drag the divider over a drawing to compare the two versions, and read both stylesheets underneath.

**Live:** [css.avolkov.dev](https://css.avolkov.dev)

| Drawing | Then | Now | Elements |
|---|---|---|---|
| Bicycle | Stylus, 11 generated keyframes, rides on hover only | `rotate: 1turn`, gradient spokes, an animated `@property` for the neon; rides on hover, focus and tap | 34 → 17 |
| Loader | 8 floated divs that move only under the mouse | one sliding repeating gradient, one `clip-path` for the bubble | 11 → 2 |
| Rocket (2021) | Sass, React rendering 100 random star divs | gradient stars, scroll-driven lift-off | 111 → 9 |

**AI power.** Each drawing has its own switch that swaps the right side for the version I made with Claude Code: each drawing as good as we could get it, in as little CSS as possible. The switches are pure CSS (`:has()` on a checkbox): brushed metal around a window into space that lights up when on.

| Drawing | AI power version | Elements | Lines |
|---|---|---|---|
| Bicycle | a road bike at sunset under a neon sign; the frame, saddle and bars are one `clip-path` polygon; road, dunes and spokes move at one speed so the wheels roll | 2 | 73 |
| Loader | one element with real “Loading…” text; stripes and a shine in one loop | 1 | 44 |
| Rocket | the outline is one polygon, with nose, fins and window as gradient layers inside it; a flickering exhaust, a planet, scroll-driven lift-off | 2 | 74 |

Line counts skip comments and blank lines. Every drawing respects `prefers-reduced-motion`.

## How it's made

- `site/2026/`: the 2026 redraws, faithful to the original shapes, one plain CSS file each. No build step and no JavaScript.
- `site/ai/`: the AI power versions, one plain CSS file each.
- `site/2015/` and `site/2021/`: the original pages, shown in frames on the page. The 2015 files come from commit `1f692ee`, unchanged except for removing the music and a font I can't share; each page says what was removed. The 2021 rocket is the React component's output as plain HTML, with its Sass compiled.
- `site/index.html`, `site/input.css`, `site/page.js`: the page around the drawings, built with Tailwind CSS and Tailwind Plus patterns. `page.js` fits each drawing to its frame, adds the divider and loads the code panels.

The React app from 2021 (Create React App, Bootstrap, node-sass) is kept at the tag [`legacy-2021`](https://github.com/slimcandy/css3IsAwesome/tree/legacy-2021).

## Run it

```sh
git clone https://github.com/slimcandy/css3IsAwesome
cd css3IsAwesome
npm install
npm run build   # compiles site/style.css
npx serve site
```

`npm run dev` rebuilds the page styles on change. The drawings themselves need nothing.

## Credits

Titles use [Limelight](https://fonts.google.com/specimen/Limelight) by Sorkin Type (SIL Open Font License).
