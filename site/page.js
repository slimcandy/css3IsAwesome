// The page around the drawings: fits each drawing to its frame, adds the
// divider, and loads the stylesheets into the code panels. The drawings
// themselves use no JavaScript.

for (const compare of document.querySelectorAll(".compare")) {
  const width = Number(compare.dataset.width);
  const height = Number(compare.dataset.height);
  const [x, y] = compare.dataset.crop.split(" ").map(Number);

  compare.style.setProperty("--width", width);
  compare.style.setProperty("--ratio", `${width} / ${height}`);
  new ResizeObserver(([entry]) => {
    compare.style.setProperty("--scale", entry.contentRect.width / width);
  }).observe(compare);

  // The old page has its own margins: move it so the drawing sits at 0, 0.
  // The extra room keeps the old page from showing scrollbars.
  const iframe = compare.querySelector("iframe");
  iframe.width = width + x + 40;
  iframe.height = height + y + 40;
  iframe.style.translate = `calc(${-x}px * var(--scale, 1)) calc(${-y}px * var(--scale, 1))`;

  const divider = document.createElement("input");
  divider.type = "range";
  divider.className = "divider";
  divider.min = "0";
  divider.max = "100";
  divider.value = "50";
  divider.setAttribute("aria-label", `Divider: ${compare.dataset.old} on the left, 2026 on the right`);
  divider.addEventListener("input", () => {
    compare.style.setProperty("--split", divider.value / 100);
  });

  const line = document.createElement("span");
  line.className = "line";
  const grip = document.createElement("span");
  grip.className = "grip";
  grip.innerHTML =
    '<svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M7.5 5 2.5 10l5 5V5Zm5 0v10l5-5-5-5Z"/></svg>';

  compare.append(line, divider, grip);
}

// Lines of code, without comments and blank lines.
function countLines(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.trim().startsWith("//")).length;
}

for (const figure of document.querySelectorAll(".code")) {
  fetch(figure.dataset.src)
    .then((response) => (response.ok ? response.text() : Promise.reject(response.status)))
    .then((text) => {
      figure.querySelector("code").textContent = text.trimEnd();
      figure.querySelector("[data-lines]").textContent = `${countLines(text)} lines`;
    })
    .catch(() => {});
}
