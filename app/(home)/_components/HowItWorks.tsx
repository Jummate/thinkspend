import React from "react";
import Container from "@/components/layout/Container";

const steps = [
  {
    number: "1",
    title: "Describe the expense",
    description:
      'Type it however feels natural — "bought groceries 15500" works just fine.',
  },
  {
    number: "2",
    title: "Review the details",
    description:
      "ThinkSpend fills in amount, category, and date. Adjust anything before you save.",
  },
  {
    number: "3",
    title: "See it add up",
    description:
      "Your dashboard, budget, and analytics update instantly — no manual entry required.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-secondary py-20"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="text-xs font-extrabold uppercase tracking-wider text-primary">
            How it works
          </div>
          <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-foreground">
            Three steps. That&apos;s it.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center"
            >
              <div className="mx-auto mb-4.5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary font-mono text-[15px] font-bold text-primary">
                {step.number}
              </div>
              <h4 className="mb-2 text-[15.5px] font-extrabold text-foreground">
                {step.title}
              </h4>
              <p className="mx-auto max-w-57.5 text-[13px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;
