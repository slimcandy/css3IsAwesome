// Makes the link-preview card (Open Graph, 1200×630) and the home-screen icon
// from the page itself: the bicycle with AI power on, 2015 on the left and the
// 2026 sunset on the right, next to the title. Serve the site, then run it:
//   npx serve site & node scripts/share-card.mjs http://localhost:3000/
// Needs playwright-core's Chromium once: npx playwright-core install chromium
// The screenshots are sRGB JPEG/PNG: link previews often drop colour profiles.
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:3000/";
const browser = await chromium.launch();

const card = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: "light", reducedMotion: "reduce" });
await card.goto(url);
await card.evaluate(() => document.fonts.ready);
await card.evaluate(() => {
  const article = document.querySelector("#bicycle");
  article.querySelector(".ai-switch input").checked = true;
  const compare = article.querySelector(".compare");
  compare.querySelector("iframe").loading = "eager";
  compare.style.setProperty("--split", "0.5");

  const text = document.createElement("div");
  text.className = "card-text";
  text.innerHTML = `<p class="kicker">2015 → 2026</p><h1>CSS is awesome</h1>
    <p class="tagline">Three drawings in pure CSS, drawn by hand in 2015 and redrawn in 2026, by hand and with Claude Code. Drag the divider to compare.</p>`;
  const wrap = document.createElement("div");
  wrap.className = "card";
  wrap.append(text, article);
  document.body.replaceChildren(wrap);
});
await card.addStyleTag({
  content: `body { margin: 0; inline-size: 1200px; block-size: 630px; overflow: hidden }
    .card { display: grid; grid-template-columns: 1fr 450px; align-items: center; gap: 56px; box-sizing: border-box; block-size: 630px; padding: 0 64px }
    .kicker { margin: 0; font: 600 1.125rem/1.5 var(--font-sans); letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-accent) }
    .card-text h1 { margin: 0.5rem 0 0; font: 4.75rem/1.05 var(--font-display); text-wrap: balance }
    .tagline { margin: 1.5rem 0 0; font-size: 1.375rem; line-height: 1.5; color: var(--color-ink); opacity: 0.8; text-wrap: pretty }
    #bicycle { margin: 0; padding: 0; border: 0 }
    #bicycle .exhibit-head, #bicycle .placard, #bicycle .code-pair { display: none !important }
    #bicycle .exhibit-body { display: block; margin: 0 }`,
});
// The 2015 page in the frame, the fonts and the fit (--scale) must all be in.
await card.waitForFunction(() => {
  const frame = document.querySelector("#bicycle iframe");
  const bike = frame.contentDocument?.querySelector("#bike");
  const scale = getComputedStyle(document.querySelector("#bicycle .compare")).getPropertyValue("--scale");
  return bike && getComputedStyle(bike).width === "450px" && scale === "1" && document.fonts.status === "loaded";
});
await card.waitForTimeout(300);
await card.screenshot({ path: "site/share/card-1200x630.jpg", type: "jpeg", quality: 88, animations: "disabled" });

// The home-screen icon is the favicon on its own dark ground: iOS masks the corners itself.
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.goto(url);
await icon.evaluate(() => {
  const img = Object.assign(document.createElement("img"), { src: "favicon.svg", width: 180, height: 180 });
  document.body.replaceChildren(img);
  return img.decode();
});
await icon.addStyleTag({ content: `body { margin: 0; background: #1f1a17 } img { display: block }` });
await icon.screenshot({ path: "site/share/apple-touch-icon.png" });

await browser.close();
console.log("share card and icon written to site/share/");
