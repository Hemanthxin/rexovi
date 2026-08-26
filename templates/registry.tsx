import type { ReactElement } from "react";
import Finora from "./finora/Finora";
import Lumina from "./lumina/Lumina";
import Medora from "./medora/Medora";
import Travella from "./travella/Travella";
import Nexora from "./nexora/Nexora";

/**
 * Built template sites.
 *
 * Entries return an element rather than a component reference: resolving a
 * component from a lookup and rendering it as <Site /> reads to the compiler
 * as creating a component during render.
 *
 * Adding a template: create `templates/<slug>/` with a `content.ts`, a
 * component and a scoped stylesheet, add it here, then set
 * `livePreview: true` on its entry in `lib/templates.ts`.
 *
 * Server-only — importing this from a client component would drag every
 * template site into the browser bundle.
 */
const sites: Record<string, () => ReactElement> = {
  finora: () => <Finora />,
  nexora: () => <Nexora />,
  lumina: () => <Lumina />,
  medora: () => <Medora />,
  travella: () => <Travella />,
};

export const templateSlugs = Object.keys(sites);

export function renderTemplateSite(slug: string): ReactElement | null {
  return sites[slug]?.() ?? null;
}
