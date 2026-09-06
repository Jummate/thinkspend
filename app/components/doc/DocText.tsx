import React from "react";

type SectionHeadingProps = {
  number: string;
  id?: string;
  children: React.ReactNode;
};

export function SectionHeading({
  number,
  id,
  children,
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="mb-3 mt-9 text-[19px] font-extrabold tracking-tight text-foreground"
    >
      <span className="mr-2 font-mono text-primary">{number}</span>
      {children}
    </h2>
  );
}