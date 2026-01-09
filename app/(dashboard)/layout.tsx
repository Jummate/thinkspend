import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <p>This is coming from dashboard layout.</p>
      {children}
    </div>
  );
};

export default DashboardLayout;
