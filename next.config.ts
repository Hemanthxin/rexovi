import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Product screenshots are UI, not photography — text and 1px borders show
     * compression artefacts long before a photo would. The sources are already
     * compressed WebP, so the default q75 re-encode visibly softens them.
     */
    qualities: [75, 90],
    /* WebP only: sources are already WebP, and AVIF encoding of a 3804px
       screenshot costs seconds per variant for a marginal size win. */
    formats: ["image/webp"],
  },
};

export default nextConfig;
