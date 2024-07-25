import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";
import netlify from "@astrojs/netlify";
import webVitals from "@astrojs/web-vitals";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), webVitals(), mdx()],
  output: "server",
  adapter: netlify()
});