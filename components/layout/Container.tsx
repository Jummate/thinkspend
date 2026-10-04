import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-280 px-7 ${className}`}>
      {children}
    </div>
  );
}

export default Container;