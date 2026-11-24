import type { MetadataRoute } from "next";
import { SITE_URL as SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/saafera", priority: 0.9, freq: "monthly" },
    { path: "/templates", priority: 0.9, freq: "weekly" },
    { path: "/work", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/verify", priority: 0.4, freq: "monthly" },
  ];

  const lastModified = new Date("2026-01-01");

  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
