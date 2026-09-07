import React from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";

const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "yakubjumat@gmail.com", href: "mailto:yakubjumat@gmail.com" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-border py-11">
      <Container className="flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-55">
          <Link
            href="/"
            className="mb-3.5 flex items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              TS
            </span>
            <span className="text-base font-extrabold text-foreground">
              ThinkSpend
            </span>
          </Link>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Track your spending effortlessly, one expense at a time.
          </p>
        </div>

        <div className="flex flex-wrap gap-14">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h5 className="mb-3.5 text-xs font-extrabold uppercase tracking-wider text-muted-foreground/80">
                {column.heading}
              </h5>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mb-2.5 block text-[13.5px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-10 flex flex-wrap items-center justify-between gap-2.5 border-t border-dashed border-border pt-6 text-[12.5px] text-muted-foreground/80">
        <div>© 2026 ThinkSpend. All rights reserved.</div>
        <div>Made in Lagos 🇳🇬</div>
      </Container>
    </footer>
  );
}

export default Footer;
