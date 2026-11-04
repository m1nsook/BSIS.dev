import { describe, expect, test } from "bun:test";
import { runInNewContext } from "node:vm";
import { prepaintTheme } from "../src/lib/theme-bootstrap.ts";

function bootstrap(saved, prefersDark, storageThrows = false) {
  // Simulate the server-rendered root starting in dark mode.
  const classes = new Set(["dark"]);
  const root = {
    classList: {
      toggle: (name, enabled) => {
        if (enabled) classes.add(name);
        else classes.delete(name);
      },
    },
    style: { colorScheme: "", backgroundColor: "" },
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
  return { dark: classes.has("dark"), colorScheme: root.style.colorScheme, backgroundColor: root.style.backgroundColor };
}

describe("theme is ready before the first paint", () => {
  test("stored dark beats system light", () => {
    expect(bootstrap("dark", false)).toEqual({ dark: true, colorScheme: "dark", backgroundColor: "#0c0c0c" });
  });
  test("stored light beats system dark", () => {
    expect(bootstrap("light", true)).toEqual({ dark: false, colorScheme: "light", backgroundColor: "#ffffff" });
  });
  test("follows system dark when unset", () => {
    expect(bootstrap(null, true)).toEqual({ dark: true, colorScheme: "dark", backgroundColor: "#0c0c0c" });
  });
  test("follows system light when unset", () => {
    expect(bootstrap(null, false)).toEqual({ dark: false, colorScheme: "light", backgroundColor: "#ffffff" });
  });
  test("works when storage is denied", () => {
    expect(bootstrap(null, true, true)).toEqual({ dark: true, colorScheme: "dark", backgroundColor: "#0c0c0c" });
  });
});
