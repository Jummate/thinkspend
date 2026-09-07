import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/doc/DocText";
import DocPage from "@/components/doc/DocPage";

const toc = [
  { id: "acceptance", label: "1. Acceptance of terms" },
  { id: "service", label: "2. Description of the service" },
  { id: "accounts", label: "3. Accounts & eligibility" },
  { id: "acceptable-use", label: "4. Acceptable use" },
  { id: "content", label: "5. Your content" },
  { id: "disclaimer", label: "6. Disclaimer of warranties" },
  { id: "liability", label: "7. Limitation of liability" },
  { id: "termination", label: "8. Termination" },
  { id: "changes", label: "9. Changes to these terms" },
  { id: "law", label: "10. Governing law" },
  { id: "contact", label: "11. Contact us" },
];

function TermsOfService() {
  return (
    <DocPage
      title="Terms of Service"
      lastUpdated="August 30, 2026"
      toc={toc}
      disclaimer={
        <>
          <b className="mb-1 block">This is a draft, not legal advice.</b>A
          reasonable starting point for a small app with real users, but not
          reviewed by a lawyer. Have one review it before treating it as binding
          — especially the liability and dispute sections, which vary a lot by
          jurisdiction.
        </>
      }
    >
      <p className="my-6 text-[14.5px] leading-relaxed text-muted-foreground">
        These Terms of Service (&quot;Terms&quot;) govern your use of
        ThinkSpend. By creating an account or using the app, you agree to these
        Terms. If you don&apos;t agree, please don&apos;t use ThinkSpend.
      </p>

      <SectionHeading
        number="01"
        id="acceptance"
      >
        Acceptance of terms
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        By registering for an account, you confirm that you&apos;re able to
        enter into a binding agreement (see Section 3 on eligibility) and that
        you accept these Terms and our{" "}
        <Link
          href="/privacy"
          className="text-primary font-bold"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <SectionHeading
        number="02"
        id="service"
      >
        Description of the service
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        ThinkSpend is a personal expense-tracking tool. It lets you manually log
        expenses (including via AI-assisted natural-language parsing), organize
        them by category, set monthly budgets, and view basic analytics.
        ThinkSpend does not connect to your bank accounts or move money — it is
        a record-keeping tool only, and figures shown are only as accurate as
        what you enter.
      </p>

      <SectionHeading
        number="03"
        id="accounts"
      >
        Accounts & eligibility
      </SectionHeading>

      <ul className="mb-3 ml-[22px] list-disc">
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          You must provide accurate information when creating an account and
          keep your login credentials secure.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          You&apos;re responsible for all activity that happens under your
          account.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          You must be at least 13 years old (or the minimum age required in your
          country) to use ThinkSpend.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          Notify us immediately if you suspect unauthorized access to your
          account.
        </li>
      </ul>

      <SectionHeading
        number="04"
        id="acceptable-use"
      >
        Acceptable use
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        You agree not to:
      </p>

      <ul className="mb-3 ml-[22px] list-disc">
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          Use ThinkSpend for any unlawful purpose
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          Attempt to gain unauthorized access to other users&apos; accounts or
          data
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          Interfere with, disrupt, or attempt to reverse-engineer the app
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          Use automated means (bots, scrapers) to access the service without
          permission
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          Upload malicious code or attempt to compromise the app&apos;s security
        </li>
      </ul>

      <SectionHeading
        number="05"
        id="content"
      >
        Your content
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        You retain ownership of the expense data and any other information you
        enter into ThinkSpend (&quot;your content&quot;). You grant us a limited
        license to store, process, and display your content solely to provide
        and improve the service to you. We won&apos;t use your content for any
        other purpose without your consent.
      </p>

      <SectionHeading
        number="06"
        id="disclaimer"
      >
        Disclaimer of warranties
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        ThinkSpend is provided &quot;as is&quot; and &quot;as available,&quot;
        without warranties of any kind, express or implied. We don&apos;t
        guarantee the app will be uninterrupted, error-free, or perfectly
        accurate — including AI-parsed expense details, which you should always
        review before saving. ThinkSpend is not financial, tax, or investment
        advice.
      </p>

      <SectionHeading
        number="07"
        id="liability"
      >
        Limitation of liability
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        To the fullest extent permitted by law, ThinkSpend and its operator will
        not be liable for any indirect, incidental, or consequential damages
        arising from your use of the app, including any loss of data or
        financial decisions made based on information shown in the app.
      </p>

      <SectionHeading
        number="08"
        id="termination"
      >
        Termination
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        You&apos;re always in control of your own account, in one of three ways:
      </p>

      <ul className="mb-3 ml-[22px] list-disc">
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Pause.</strong> You can disable
          login on your account at any time from Settings, without deleting
          anything. Your data stays intact and untouched; reactivate by logging
          back in whenever you&apos;re ready.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Delete.</strong> You can
          permanently delete your account and all associated data at any time
          from Settings. This cannot be undone.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Suspension by us.</strong>{" "}
          Separately, we may suspend or terminate accounts that violate these
          Terms, engage in abusive behavior, or pose a security risk to the
          service or other users. Where practical, we&apos;ll try to notify you
          of the reason.
        </li>
      </ul>

      <SectionHeading
        number="09"
        id="changes"
      >
        Changes to these terms
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        We may update these Terms from time to time. If we make material
        changes, we&apos;ll update the &quot;Last updated&quot; date above and,
        where appropriate, notify you directly. Continuing to use ThinkSpend
        after changes take effect means you accept the updated Terms.
      </p>

      <SectionHeading
        number="10"
        id="law"
      >
        Governing law
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        <em>
          [Placeholder — specify the country/state whose law governs these
          Terms, and where disputes would be resolved, once decided. Nigeria is
          the likely default given where the app is built, but confirm with a
          lawyer.]
        </em>
      </p>

      <SectionHeading
        number="11"
        id="contact"
      >
        Contact us
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        Questions about these Terms? Reach out at{" "}
        <Link
          href="mailto:yakubjumat@gmail.com"
          className="text-primary font-bold"
        >
          yakubjumat@gmail.com
        </Link>
        .
      </p>
    </DocPage>
  );
}

export default TermsOfService;
