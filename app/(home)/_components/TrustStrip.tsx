import React from "react";
import Container from "@/lib/shared/components/layout/Container";

const currencies = [
  { flag: "🇳🇬", label: "Naira" },
  { flag: "🇺🇸", label: "Dollar" },
  { flag: "🇪🇺", label: "Euro" },
  { flag: "🇬🇧", label: "Pound" },
];

function TrustStrip() {
  return (
    <div className="border-y border-border py-8">
      <Container>
        <p className="text-center text-[11.5px] font-bold uppercase tracking-wider text-muted-foreground/80">
          Currencies supported
        </p>
        <div className="mt-4.5 flex flex-wrap items-center justify-center gap-11 text-[15px] font-extrabold text-muted-foreground/70">
          {currencies.map((currency) => (
            <span key={currency.label} className="flex items-center gap-2">
              <span aria-hidden>{currency.flag}</span>
              {currency.label}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default TrustStrip;