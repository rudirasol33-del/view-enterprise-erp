import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VE One · Enterprise Business Platform",
    short_name: "VE One",
    description: "The intelligent enterprise platform by View Enterprise.",
    start_url: "/login",
    display: "standalone",
    background_color: "#06172f",
    theme_color: "#071a33",
    orientation: "any",
    categories: ["business", "productivity", "finance"],
    icons: [
      {
        src: "/ve-one-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
