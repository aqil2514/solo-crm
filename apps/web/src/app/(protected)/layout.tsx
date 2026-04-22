import { Header } from "@/components/layouts/header";
import React from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <>
  <Header />
  {children}</>;
}
