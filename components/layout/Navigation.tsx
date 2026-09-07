"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import Container from "@/components/layout/Container";
import { useUser } from "@/lib/hooks/useUser";
import { ROUTES } from "@/lib/routes";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
];

function getInitials(
  profile: { firstName: string; lastName: string } | null,
  email: string | undefined,
): string {
  if (profile?.firstName || profile?.lastName) {
    const initials = `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`;
    if (initials) return initials.toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

function Avatar({
  initials,
  className = "",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(155deg, var(--category-bills), var(--primary-dark))",
      }}
    >
      {initials}
    </span>
  );
}

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, loading } = useUser();
  const isAuthenticated = !loading && !!user;
  const initials = getInitials(profile, user?.email);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      {/* Header */}
      <Container>
        <nav className="relative z-50 flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              TS
            </span>

            <span className="text-lg font-extrabold text-foreground">
              ThinkSpend
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 md:flex">
            {!loading && (
              <>
                {isAuthenticated ? (
                  <>
                    <Link
                      href={ROUTES.DASHBOARD}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={ROUTES.SETTINGS}
                      aria-label="Account settings"
                    >
                      <Avatar initials={initials} />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={ROUTES.LOGIN}
                      className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      Log in
                    </Link>
                    <Link
                      href={ROUTES.SIGNUP}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Get started free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <>
          {/* Page backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/10 md:hidden"
          />

          {/* Mobile menu */}
          <div
            id="mobile-navigation"
            className="relative z-50 border-t border-border bg-background md:hidden"
          >
            <div className="px-6 pb-6 pt-5">
              <div className="flex flex-col">
                {/* Navigation links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}

                {!loading &&
                  (isAuthenticated ? (
                    <>
                      {/* Account row */}
                      <Link
                        href="/settings"
                        onClick={closeMenu}
                        className="flex items-center gap-3 py-4"
                      >
                        <Avatar initials={initials} />
                        <span className="text-sm font-semibold text-foreground">
                          {profile?.firstName
                            ? `${profile.firstName} ${profile.lastName ?? ""}`.trim()
                            : user?.email}
                        </span>
                      </Link>

                      {/* CTA */}
                      <Link
                        href={ROUTES.DASHBOARD}
                        onClick={closeMenu}
                        className="mt-3 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        Go to Dashboard
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* Login */}
                      <Link
                        href={ROUTES.LOGIN}
                        onClick={closeMenu}
                        className="py-4 text-sm font-semibold text-foreground"
                      >
                        Log in
                      </Link>

                      {/* CTA */}
                      <Link
                        href={ROUTES.SIGNUP}
                        onClick={closeMenu}
                        className="mt-3 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        Get started free
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Navigation;
