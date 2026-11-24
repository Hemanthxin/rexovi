import type { Metadata } from "next";
import { COMPANY } from "@/lib/site";
import VerifyView from "./VerifyView";

export const metadata: Metadata = {
  title: "Verify a Certificate",
  description: `Check whether a certificate issued by ${COMPANY.name} is genuine. Enter the Certificate ID printed on it.`,
  alternates: { canonical: "/verify" },
};

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ id?: string | string[] }> }) {
  const { id } = await searchParams;
  return <VerifyView id={Array.isArray(id) ? id[0] : id} />;
}
