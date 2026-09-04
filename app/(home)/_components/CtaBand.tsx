import React from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/lib/shared/components/layout/Container";
import Link from "next/link";

function CtaBand() {
  return (
    <section className="py-20">
      <Container>
        <div
          className="rounded-3xl px-10 py-16 text-center text-primary-foreground"
          style={{
            backgroundImage:
              "linear-gradient(155deg, var(--primary), color-mix(in srgb, var(--primary) 65%, black))",
          }}
        >
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-[30px]">
            Start tracking in the next 60 seconds.
          </h2>
          <p className="mt-3 text-[15px] opacity-90">
            No setup, no charge — just describe your first expense.
          </p>
          <Link href="/signup" className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-card px-6 py-3.5 text-[15px] font-extrabold text-primary transition-opacity hover:opacity-90">
            Get started free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default CtaBand;