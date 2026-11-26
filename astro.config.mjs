import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "awtwhite",
      social: {
        github: "https://github.com/awtwhite",
      },
      sidebar: [
        {
          label: "Drill apps",
          items: [
            // The full /index.html path works both in `astro dev` and on the deployed site.
            {
              label: "Kana Drill",
              link: "/kana-drill/index.html",
              attrs: { target: "_blank" },
            },
            {
              label: "Eigo Drill",
              link: "/eigo-drill/index.html",
              attrs: { target: "_blank" },
            },
            {
              label: "Kanji Drill",
              link: "/kanji-drill/index.html",
              attrs: { target: "_blank" },
            },
            {
              label: "Nihongo Drill",
              link: "/nihongo-drill/index.html",
              attrs: { target: "_blank" },
            },
          ],
        },
      ],
    }),
  ],
});
