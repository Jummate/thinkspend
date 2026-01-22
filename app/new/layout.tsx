import SimpleHeader from "@/app/new/_components/SimpleHeader";
import { PropsWithChildren } from "react";

export default function AddExpenseLayout({ children }:PropsWithChildren) {
  return (
    <>
      <SimpleHeader /> 
      <main>{children}</main>
    </>
  );
}