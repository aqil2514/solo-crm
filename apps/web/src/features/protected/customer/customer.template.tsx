"use client";
import MainContainer from "@/components/containers/container-with-action";
import { PageHeader } from "@/components/molecules/page-header";
import { Button } from "@/components/ui/button";
import { CustomerProvider } from "./provider/customer.provider";
import { useQueryState } from "@/hooks/use-query-state";
import { DialogCustomerAdd } from "./dialogs/add";

export function CustomerTemplate() {
  return (
    <CustomerProvider>
      <InnerTemplate />
    </CustomerProvider>
  );
}

const InnerTemplate = () => {
  const { set } = useQueryState();
  return (
    <>
      <MainContainer>
        <PageHeader
          title="Pelanggan"
          description="Kelola data pelanggan dan riwayat transaksi mereka di sini."
        />
        <Button onClick={() => set("dialog", "add")}>Tambah Pelanggan</Button>
      </MainContainer>

      <DialogCustomerAdd />
    </>
  );
};
