// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "My Docs",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/general-guan/blog",
        },
      ],
      sidebar: [
        {
          label: "JavaScript",
          items: [
            {
              label: "标准库",
              items: [{ label: "Array 对象", slug: "javascript/stdlib/array" }],
            },
          ],
        },
      ],
    }),
  ],
});
