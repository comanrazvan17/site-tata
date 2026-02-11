import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://atelier-mobila.ro/", lastModified: new Date() }];
}
