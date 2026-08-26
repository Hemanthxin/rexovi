import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderTemplateSite, templateSlugs } from "@/templates/registry";
import { templateBySlug } from "@/lib/templates";
import DemoBar from "./DemoBar";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return templateSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = templateBySlug(slug);
  if (!item) return {};
  return {
    // `absolute` keeps the Rexovi title template off a demo site.
    title: { absolute: `${item.name} — ${item.tagline}` },
    description: item.description,
    // Placeholder copy should never compete with the real site in search.
    robots: { index: false, follow: false },
  };
}

export default async function TemplatePreviewPage({ params }: Params) {
  const { slug } = await params;
  const site = renderTemplateSite(slug);
  const meta = templateBySlug(slug);
  if (!site || !meta) notFound();

  return (
    <>
      {site}
      <DemoBar name={meta.name} tagline={meta.tagline} slug={meta.slug} />
    </>
  );
}
