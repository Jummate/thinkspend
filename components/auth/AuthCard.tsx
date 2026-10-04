import React from "react";

type AuthCardProps = {
  children: React.ReactNode;
};

function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5">
      <div
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--border) 0 8px, transparent 8px 14px)",
        }}
      />
      {children}
    </div>
  );
}

export default AuthCard;