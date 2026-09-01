import React from "react";

export function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-3 mt-9 text-[19px] font-extrabold tracking-tight text-foreground">
      <span className="mr-2 font-mono text-primary">{number}</span>
      {children}
    </h2>
  );
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[14.5px] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

export function List({ children }: { children: React.ReactNode }) {
  return <ul className="mb-3 ml-[22px] list-disc">{children}</ul>;
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="mb-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
      {children}
    </li>
  );
}