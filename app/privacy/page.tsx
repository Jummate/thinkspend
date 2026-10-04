import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/doc/DocText";
import DocPage from "@/components/doc/DocPage";

const toc = [
  { id: "collect", label: "1. Information we collect" },
  { id: "use", label: "2. How we use your information" },
  { id: "storage", label: "3. Data storage & security" },
  { id: "sharing", label: "4. Sharing your information" },
  { id: "retention", label: "5. Data retention" },
  { id: "rights", label: "6. Your rights & choices" },
  { id: "cookies", label: "7. Cookies & similar technologies" },
  { id: "children", label: "8. Children's privacy" },
  { id: "changes", label: "9. Changes to this policy" },
  { id: "contact", label: "10. Contact us" },
];

function PrivacyPolicy() {
  return (
    <DocPage
      title="Privacy Policy"
      lastUpdated="August 30, 2026"
      toc={toc}
      disclaimer={
        <>
          <b className="mb-1 block">This is a draft, not legal advice.</b>
          Written to be a solid starting point for a small app collecting real
          user data, but it has not been reviewed by a lawyer. Have one review
          it — and check requirements in your users&apos; jurisdictions (e.g.
          Nigeria&apos;s Data Protection Act, GDPR if you have EU users, CCPA if
          you have California users) — before relying on it.
        </>
      }
    >
      <p className="my-6 text-[14.5px] leading-relaxed text-muted-foreground">
        ThinkSpend (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) lets you
        log and track personal expenses. This policy explains what information
        we collect when you use ThinkSpend, how we use it, and the choices you
        have. By creating an account, you agree to the practices described here.
      </p>

      <SectionHeading
        number="01"
        id="collect"
      >
        Information we collect
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Account information.</strong> When
        you sign up, we collect your first name, last name, email address, and a
        securely hashed version of your password. We never store your password
        in plain text.
      </p>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Expense data.</strong> Anything you
        log — amounts, descriptions, categories, dates, and your chosen currency
        and budget settings — is stored so the app can show it back to you.
      </p>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Usage data.</strong> We may
        automatically collect basic technical information, such as device type,
        browser, IP address, and general usage patterns (e.g. pages visited,
        features used), to keep the app working and improve it.
      </p>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        <strong className="text-foreground">What we don&apos;t collect.</strong>{" "}
        We do not ask for or store bank account numbers, card numbers, or
        credentials to any external financial account. ThinkSpend is a manual
        expense log, not a connected banking service.
      </p>

      <SectionHeading
        number="02"
        id="use"
      >
        How we use your information
      </SectionHeading>

      <ul className="mb-3 ml-[22px] list-disc">
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          To create and maintain your account
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          To display your dashboard, expense history, budgets, and analytics
          back to you
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          To power the AI expense-parsing feature (your typed description is
          processed to extract amount, category, and date)
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          To send you account-related communications (e.g. password resets)
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          To detect, investigate, and prevent fraud, abuse, or security issues
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          To understand aggregate usage and improve the app
        </li>
      </ul>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        We do not use your expense data to build an advertising profile, and we
        do not sell your data to advertisers or data brokers.
      </p>

      <SectionHeading
        number="03"
        id="storage"
      >
        Data storage & security
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        Your data is stored on servers operated by our hosting/database
        provider. We use industry-standard measures — encryption in transit
        (HTTPS), password hashing, and access controls — to protect your
        information. That said, no method of storage or transmission is 100%
        secure, and we can&apos;t guarantee absolute security.
      </p>

      <SectionHeading
        number="04"
        id="sharing"
      >
        Sharing your information
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        We do not sell your personal data. We may share limited information
        with:
      </p>

      <ul className="mb-3 ml-[22px] list-disc">
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Service providers</strong> who
          help us run ThinkSpend (e.g. hosting, database, email delivery, and
          the AI provider used for expense parsing), under obligations to
          protect your data
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Legal authorities</strong>, if
          required to comply with a law, regulation, or valid legal process
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">A successor entity</strong>, if
          ThinkSpend is ever transferred, merged, or acquired — you&apos;d be
          notified first
        </li>
      </ul>

      <SectionHeading
        number="05"
        id="retention"
      >
        Data retention
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        We keep your account and expense data for as long as your account is
        active. If you delete your account, we will delete or anonymize your
        personal data within a reasonable period, except where we&apos;re
        required to retain it for legal or security reasons.
      </p>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Paused accounts.</strong> You can
        pause your account from Settings instead of deleting it. While paused,
        login is disabled and we stop actively using your data for anything
        beyond keeping it intact — but nothing is deleted. Data from a paused
        account is retained indefinitely until you either reactivate (by logging
        back in) or delete your account; we do not currently apply an automatic
        deletion timeline to paused accounts, though we may introduce one in the
        future, in which case this policy will be updated first.
      </p>

      <SectionHeading
        number="06"
        id="rights"
      >
        Your rights & choices
      </SectionHeading>

      <ul className="mb-3 ml-[22px] list-disc">
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Access & correction.</strong> You
          can view and update your profile information from Settings at any
          time.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">
            Restriction of processing.
          </strong>{" "}
          You can pause your account from Settings at any time to stop active
          processing of your data without deleting it.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Deletion.</strong> You can
          permanently delete your account and all associated data at any time
          from Settings, or by contacting us.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Export.</strong> You can request a
          copy of your data in a portable format.
        </li>
        <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Withdrawal of consent.</strong>{" "}
          Where we rely on your consent to process data, you may withdraw it at
          any time by pausing or deleting your account.
        </li>
      </ul>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        Depending on where you live, you may have additional rights under local
        law (for example, under GDPR or Nigeria&apos;s Data Protection Act).
      </p>

      <SectionHeading
        number="07"
        id="cookies"
      >
        Cookies & similar technologies
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        We use essential cookies or local storage to keep you signed in and
        remember basic preferences (like your currency or theme). We do not
        currently use third-party advertising or tracking cookies.
      </p>

      <SectionHeading
        number="08"
        id="children"
      >
        Children&apos;s privacy
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        ThinkSpend is not directed at children under 13 (or the relevant age of
        digital consent in your country), and we do not knowingly collect data
        from them. If you believe a child has created an account, contact us and
        we&apos;ll take appropriate action.
      </p>

      <SectionHeading
        number="09"
        id="changes"
      >
        Changes to this policy
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        We may update this policy from time to time. If we make material
        changes, we&apos;ll update the &quot;Last updated&quot; date above and,
        where appropriate, notify you directly.
      </p>

      <SectionHeading
        number="10"
        id="contact"
      >
        Contact us
      </SectionHeading>

      <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
        Questions about this policy or your data? Reach out at{" "}
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

export default PrivacyPolicy;
