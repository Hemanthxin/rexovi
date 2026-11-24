import type { Metadata } from "next";
import { normaliseId } from "@/lib/certificates";
import VerifyView from "../VerifyView";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Certificate ${normaliseId(decodeURIComponent(id))}`,
    alternates: { canonical: "/verify" },
    robots: { index: false, follow: false },
  };
}

export default async function VerifyIdPage({ params }: Props) {
  const { id } = await params;
  return <VerifyView id={decodeURIComponent(id)} />;
}
