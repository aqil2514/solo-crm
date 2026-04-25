"use client";
import MainContainer from "@/components/containers/container-with-action";
import { PageHeader } from "@/components/molecules/page-header";
import { Button } from "@/components/ui/button";
import { useQueryState } from "@/hooks/use-query-state";
import { CustomerStatusProvider } from "./provider/customer-status.provider";
import { CustomerStatusTable } from "./components/table";
import { CustomerStatusAddDialog } from "./components/dialogs/add";
import { CustomerStatusDeleteDialog } from "./components/dialogs/delete";
import { CustomerStatusEditDialog } from "./components/dialogs/edit";
import { useTranslations } from "next-intl";

export function CustomerStatus() {
  return (
    <CustomerStatusProvider>
      <InnerTemplate />
    </CustomerStatusProvider>
  );
}

const InnerTemplate = () => {
  const { set } = useQueryState();
  const t = useTranslations("customer_status");
  return (
    <>
      <MainContainer>
        <PageHeader
          title={t("title")}
          description={t("description")}
        />
        <Button onClick={() => set("dialog", "add")}>{t("addButton")}</Button>

        <CustomerStatusTable />
      </MainContainer>

      <CustomerStatusAddDialog />
      <CustomerStatusEditDialog />
      <CustomerStatusDeleteDialog />
    </>
  );
};
