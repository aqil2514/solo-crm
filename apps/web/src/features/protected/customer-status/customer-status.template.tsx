"use client";
import MainContainer from "@/components/containers/container-with-action";
import { PageHeader } from "@/components/molecules/page-header";
import { Button } from "@/components/ui/button";
import { useQueryState } from "@/hooks/use-query-state";

export function CustomerStatus() {
  const { set } = useQueryState();
  return (
    <MainContainer>
      <PageHeader title="Status Pelanggan" description="Stqatus pelanggan" />
      <Button onClick={() => set("dialog", "add")}>Tambah Status</Button>
    </MainContainer>
  );
}
