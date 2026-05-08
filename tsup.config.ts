import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  platform: "node",
  target: "node18",
  bundle: true,
  splitting: false,
  minify: true,
  sourcemap: true,
  clean: true,
  dts: false,
});

