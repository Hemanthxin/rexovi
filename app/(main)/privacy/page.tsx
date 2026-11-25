import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { ContactRoute, type LegalSection } from "@/components/site/LegalPage";
import { COMPANY } from "@/lib/site";
import s from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${COMPANY.name} collects, uses and protects personal data submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This website is operated by <strong>{COMPANY.legalName}</strong> (CIN {COMPANY.cin}), a company
          incorporated in {COMPANY.region}, India (&ldquo;Rexovi&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). For
          the purposes of the Digital Personal Data Protection Act, 2023, we are the Data Fiduciary for the
          personal data described in this policy.
        </p>
        <p>
          This policy covers this website only. Our product Saafera has its own privacy policy, published on
          its site.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <p>We collect personal data only when you choose to send us a project enquiry:</p>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name and email address</td>
              <td>You enter them in the enquiry form (required)</td>
            </tr>
            <tr>
              <td>Company, budget range, project types, chosen template and your message</td>
              <td>You enter or select them in the enquiry form</td>
            </tr>
            <tr>
              <td>The page the enquiry was sent from and your browser&apos;s user-agent string</td>
              <td>Sent automatically with the form</td>
            </tr>
            <tr>
              <td>A one-way hash of your IP address</td>
              <td>Derived automatically; the IP address itself is not stored</td>
            </tr>
          </tbody>
        </table>
        <div className={s.callout}>
          We do not use analytics, advertising or tracking cookies, and we do not load third-party trackers.
          Browsing this website without submitting the form does not create a record about you with us.
        </div>
        <p>
          Our hosting provider may keep standard technical logs (such as IP address, time and page requested)
          for a short period to keep the service secure and running.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: (
      <>
        <ul>
          <li>To reply to your enquiry, discuss your project and prepare a quotation or proposal.</li>
          <li>To prevent spam and abuse — the IP hash lets us limit repeated submissions.</li>
          <li>To meet legal, tax and accounting obligations if you become a client.</li>
        </ul>
        <p>
          We process this data on the basis of the consent you give by submitting the form. We do not use it
          for unrelated marketing, and we never sell or rent it.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>
          We share personal data only with service providers that help us run this website, under their
          standard data-processing terms:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> — website hosting.
          </li>
          <li>
            <strong>Neon</strong> — the database where enquiries are stored.
          </li>
        </ul>
        <p>
          These providers may process data on servers outside India. We may also disclose data where required
          by law or by a lawful order of a court or government authority.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep enquiries for up to 24 months after our last communication with you, after which we delete
        them. If you become a client, the records needed for the engagement are kept for as long as the
        contract and Indian tax and company law require. You can ask us to delete your enquiry sooner at any
        time.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Data travels to us over encrypted HTTPS connections, is stored with access restricted to the people
        who need it to respond to you, and is never exposed publicly. No system is perfectly secure, but we
        take reasonable measures to protect your data and will notify you and the authorities of a breach as
        the law requires.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under Indian data protection law you can:</p>
        <ul>
          <li>ask what personal data we hold about you and how we use it;</li>
          <li>ask us to correct, complete or update it;</li>
          <li>ask us to erase it, or withdraw your consent at any time;</li>
          <li>nominate another person to exercise these rights on your behalf;</li>
          <li>raise a grievance with us, and if it is not resolved, with the Data Protection Board of India.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us <ContactRoute />. We will respond within a reasonable
          time and in any case within the period required by law.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        This website is intended for businesses and adults. We do not knowingly collect personal data from
        anyone under 18. If you believe a child has sent us their details, contact us and we will delete them.
      </p>
    ),
  },
  {
    id: "links",
    title: "Other websites",
    body: (
      <p>
        This website links to other sites, such as Saafera and our social media profiles. Those sites have
        their own privacy practices, which this policy does not cover.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy when our practices or the law change. The date at the top shows when it was
        last revised. Significant changes will be highlighted on this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact and grievances",
    body: (
      <p>
        Questions, requests or complaints about your personal data can be sent to {COMPANY.legalName}{" "}
        <ContactRoute />. See also our <Link href="/terms">Terms of Use</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy"
      accent="policy."
      intro="What we collect when you contact us, why, how long we keep it, and the rights you have over it — in plain language."
      sections={sections}
    />
  );
}
