import React from "react";
import Link from "next/link";
import { SectionHeading, Paragraph, List, ListItem } from "@/lib/shared/components/doc/DocText";
import DocPage from "@/lib/shared/components/doc/DocPage";

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
          <b className="mb-1 block">This is a draft, not legal advice.</b>
          A reasonable starting point for a small app with real users, but
          not reviewed by a lawyer. Have one review it before treating it
          as binding — especially the liability and dispute sections,
          which vary a lot by jurisdiction.
        </>
      }
    >
      <Paragraph>
        These Terms of Service (&quot;Terms&quot;) govern your use of
        ThinkSpend. By creating an account or using the app, you agree to
        these Terms. If you don&apos;t agree, please don&apos;t use
        ThinkSpend.
      </Paragraph>

      <SectionHeading number="01">
        <span id="acceptance">Acceptance of terms</span>
      </SectionHeading>
      <Paragraph>
        By registering for an account, you confirm that you&apos;re able
        to enter into a binding agreement (see Section 3 on eligibility)
        and that you accept these Terms and our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </Paragraph>

      <SectionHeading number="02">
        <span id="service">Description of the service</span>
      </SectionHeading>
      <Paragraph>
        ThinkSpend is a personal expense-tracking tool. It lets you
        manually log expenses (including via AI-assisted natural-language
        parsing), organize them by category, set monthly budgets, and view
        basic analytics. ThinkSpend does not connect to your bank accounts
        or move money — it is a record-keeping tool only, and figures
        shown are only as accurate as what you enter.
      </Paragraph>

      <SectionHeading number="03">
        <span id="accounts">Accounts & eligibility</span>
      </SectionHeading>
      <List>
        <ListItem>
          You must provide accurate information when creating an account
          and keep your login credentials secure.
        </ListItem>
        <ListItem>
          You&apos;re responsible for all activity that happens under your
          account.
        </ListItem>
        <ListItem>
          You must be at least 13 years old (or the minimum age required
          in your country) to use ThinkSpend.
        </ListItem>
        <ListItem>
          Notify us immediately if you suspect unauthorized access to your
          account.
        </ListItem>
      </List>

      <SectionHeading number="04">
        <span id="acceptable-use">Acceptable use</span>
      </SectionHeading>
      <Paragraph>You agree not to:</Paragraph>
      <List>
        <ListItem>Use ThinkSpend for any unlawful purpose</ListItem>
        <ListItem>
          Attempt to gain unauthorized access to other users&apos;
          accounts or data
        </ListItem>
        <ListItem>
          Interfere with, disrupt, or attempt to reverse-engineer the app
        </ListItem>
        <ListItem>
          Use automated means (bots, scrapers) to access the service
          without permission
        </ListItem>
        <ListItem>
          Upload malicious code or attempt to compromise the app&apos;s
          security
        </ListItem>
      </List>

      <SectionHeading number="05">
        <span id="content">Your content</span>
      </SectionHeading>
      <Paragraph>
        You retain ownership of the expense data and any other information
        you enter into ThinkSpend (&quot;your content&quot;). You grant us
        a limited license to store, process, and display your content
        solely to provide and improve the service to you. We won&apos;t
        use your content for any other purpose without your consent.
      </Paragraph>

      <SectionHeading number="06">
        <span id="disclaimer">Disclaimer of warranties</span>
      </SectionHeading>
      <Paragraph>
        ThinkSpend is provided &quot;as is&quot; and &quot;as
        available,&quot; without warranties of any kind, express or
        implied. We don&apos;t guarantee the app will be uninterrupted,
        error-free, or perfectly accurate — including AI-parsed expense
        details, which you should always review before saving. ThinkSpend
        is not financial, tax, or investment advice.
      </Paragraph>

      <SectionHeading number="07">
        <span id="liability">Limitation of liability</span>
      </SectionHeading>
      <Paragraph>
        To the fullest extent permitted by law, ThinkSpend and its
        operator will not be liable for any indirect, incidental, or
        consequential damages arising from your use of the app, including
        any loss of data or financial decisions made based on information
        shown in the app.
      </Paragraph>

      <SectionHeading number="08">
        <span id="termination">Termination</span>
      </SectionHeading>
      <Paragraph>
        You&apos;re always in control of your own account, in one of three
        ways:
      </Paragraph>
      <List>
        <ListItem>
          <strong className="text-foreground">Pause.</strong> You can
          disable login on your account at any time from Settings, without
          deleting anything. Your data stays intact and untouched;
          reactivate by logging back in whenever you&apos;re ready.
        </ListItem>
        <ListItem>
          <strong className="text-foreground">Delete.</strong> You can
          permanently delete your account and all associated data at any
          time from Settings. This cannot be undone.
        </ListItem>
        <ListItem>
          <strong className="text-foreground">Suspension by us.</strong>{" "}
          Separately, we may suspend or terminate accounts that violate
          these Terms, engage in abusive behavior, or pose a security risk
          to the service or other users. Where practical, we&apos;ll try
          to notify you of the reason.
        </ListItem>
      </List>

      <SectionHeading number="09">
        <span id="changes">Changes to these terms</span>
      </SectionHeading>
      <Paragraph>
        We may update these Terms from time to time. If we make material
        changes, we&apos;ll update the &quot;Last updated&quot; date above
        and, where appropriate, notify you directly. Continuing to use
        ThinkSpend after changes take effect means you accept the updated
        Terms.
      </Paragraph>

      <SectionHeading number="10">
        <span id="law">Governing law</span>
      </SectionHeading>
      <Paragraph>
        <em>
          [Placeholder — specify the country/state whose law governs these
          Terms, and where disputes would be resolved, once decided.
          Nigeria is the likely default given where the app is built, but
          confirm with a lawyer.]
        </em>
      </Paragraph>

      <SectionHeading number="11">
        <span id="contact">Contact us</span>
      </SectionHeading>
      <Paragraph>
        Questions about these Terms? Reach out at{" "}
        <Link href="mailto:yakubjumat@gmail.com">yakubjumat@gmail.com</Link>
        .
      </Paragraph>
    </DocPage>
  );
}

export default TermsOfService;