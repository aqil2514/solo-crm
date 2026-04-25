"use client";
import MainContainer from "@/components/containers/container-with-action";
import { PageHeader } from "@/components/molecules/page-header";
import { Button } from "@/components/ui/button";
import { useQueryState } from "@/hooks/use-query-state";
import { CustomerCategoriesProvider } from "./provider/customer.provider";
import { CustomerCategoryAddDialog } from "./components/dialogs/add";
import { CustomerCategoryTable } from "./components/table";
import { CustomerCategoryDeleteDialog } from "./components/dialogs/delete";

export function CustomerCategoryTemplate() {
  return (
    <CustomerCategoriesProvider>
      <InnerTemplate />
    </CustomerCategoriesProvider>
  );
}

const InnerTemplate = () => {
  const { set } = useQueryState();
  return (
    <>
      <MainContainer>
        <PageHeader
          title="Kategori Pelanggan"
          description="Atur kategori untuk pelanggan Anda"
        />
        <Button onClick={() => set("dialog", "add")}>Tambah Kategori</Button>

        <CustomerCategoryTable />
      </MainContainer>

      <CustomerCategoryAddDialog />
      <CustomerCategoryDeleteDialog />
    </>
  );
};
