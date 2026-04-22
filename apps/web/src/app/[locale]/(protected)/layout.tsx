import { Header } from "@/components/layouts/header";
import { getAuth } from "@/lib/get-auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  try {
    const userData = await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: getAuth,
    });

    if (!userData) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      {children}
    </HydrationBoundary>
  );
}
