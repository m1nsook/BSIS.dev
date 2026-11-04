import { describe, expect, test } from "bun:test";
import { runInNewContext } from "node:vm";
import { prepaintTheme } from "../src/lib/theme-bootstrap";

// The static HTML starts in dark mode; the head script must correct it
// synchronously before any browser paint, with no React involved.
function bootstrap(saved: string | null, prefersDark: boolean, storageThrows = false) {
  const classes = new Set(["dark"]);
  const root = {
    classList: {
      toggle: (name: string, enabled: boolean) => {
        if (enabled) classes.add(name);
        else classes.delete(name);
      },
    },
    style: { colorScheme: "" },
  };
  runInNewContext(prepaintTheme, {
    document: { documentElement: root },
    window: {
      localStorage: {
        getItem: () => {
          if (storageThrows) throw new Error("storage unavailable");
          return saved;
        },
      },
      matchMedia: () => ({ matches: prefersDark }),
    },
  });
  return { dark: classes.has("dark"), colorScheme: root.style.colorScheme };
}

describe("prepaint theme", () => {
  test("restores dark preference even when OS is light", () => {
    expect(bootstrap("dark", false)).toEqual({ dark: true, colorScheme: "dark" });
  });
  test("restores light preference even when OS is dark", () => {
    expect(bootstrap("light", true)).toEqual({ dark: false, colorScheme: "light" });
  });
  test("respects system dark when no preference is stored", () => {
    expect(bootstrap(null, true)).toEqual({ dark: true, colorScheme: "dark" });
  });
  test("respects system light when no preference is stored", () => {
    expect(bootstrap(null, false)).toEqual({ dark: false, colorScheme: "light" });
  });
  test("still starts when browser storage is unavailable", () => {
    expect(bootstrap(null, true, true)).toEqual({ dark: true, colorScheme: "dark" });
  });
});
