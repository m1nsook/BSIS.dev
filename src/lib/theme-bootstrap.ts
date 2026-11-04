// Keep this as a dependency-free inline script: it must execute before React
// and before the page paints, even when deploying statically to GitHub Pages.
export const prepaintTheme = `(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = window.localStorage.getItem("bsis-theme"); } catch (_) {}
  var prefersDark = false;
  try { prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; } catch (_) {}
  var dark = saved === "dark" || (saved !== "light" && prefersDark);
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  root.style.backgroundColor = dark ? "#0c0c0c" : "#ffffff";
})();`;
