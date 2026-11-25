import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { ContactRoute, type LegalSection } from "@/components/site/LegalPage";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use the ${COMPANY.name} website.`,
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "About these terms",
    body: (
      <p>
        These terms govern your use of this website, operated by <strong>{COMPANY.legalName}</strong> (CIN{" "}
        {COMPANY.cin}), {COMPANY.region}, India (&ldquo;Rexovi&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By
        using the website you agree to them. If you do not agree, please do not use the website.
      </p>
    ),
  },
  {
    id: "use",
    title: "Using the website",
    body: (
      <>
        <p>You may browse the website and contact us for lawful purposes. You must not:</p>
        <ul>
          <li>use it in a way that breaks any law or infringes anyone&apos;s rights;</li>
          <li>attempt to gain unauthorised access to, disrupt or overload the website or its systems;</li>
          <li>submit spam, malicious code, or false or misleading information through our forms;</li>
          <li>scrape, copy or harvest content or data from the website in bulk by automated means.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The website and its content — including text, graphics, the Rexovi name and logo, Saafera, and the
          designs of our website templates — belong to Rexovi or its licensors and are protected by
          intellectual property law.
        </p>
        <p>
          Template previews are shown so you can evaluate them. You may not copy, reproduce, resell or build
          on any template, design or code from this website without a purchase or written licence from us.
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    title: "Enquiries, quotations and projects",
    body: (
      <p>
        Information on this website about our services, timelines and prices is general and is not an offer.
        Sending an enquiry does not create a contract. Any project we take on is governed by a separate
        written quotation or agreement, which takes precedence over anything on this website.
      </p>
    ),
  },
  {
    id: "verification",
    title: "Certificate verification",
    body: (
      <p>
        Our <Link href="/verify">verification page</Link> confirms certificates issued by Rexovi against our
        register. A certificate that does not verify was not issued by us. We may correct or revoke a record
        if it was issued in error or obtained improperly.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Links to other websites",
    body: (
      <p>
        The website links to sites we do not control, such as social media platforms. We are not responsible
        for their content, availability or practices.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: (
      <p>
        The website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We work to keep it accurate
        and online but do not guarantee that it will be error-free, uninterrupted or free of harmful
        components, and we may change or withdraw any part of it without notice.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, Rexovi is not liable for any indirect, incidental or consequential
        loss, or for loss of profit, data or business, arising from your use of or inability to use the
        website. Nothing in these terms limits liability that cannot be limited under Indian law.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        How we handle personal data you send us is explained in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may revise these terms from time to time. The date at the top shows the latest version, which
        applies from the moment it is published.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. The courts of {COMPANY.region} have exclusive
        jurisdiction over any dispute arising from them or from your use of the website.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms can be sent to {COMPANY.legalName} <ContactRoute />.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of"
      accent="use."
      intro="The ground rules for using this website, our content and our templates."
      sections={sections}
    />
  );
}
