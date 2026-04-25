"use client";
import MainContainer from "@/components/containers/container-with-action";
import { PageHeader } from "@/components/molecules/page-header";
import { Button } from "@/components/ui/button";
import { useQueryState } from "@/hooks/use-query-state";
import { CustomerCategoriesProvider } from "./provider/customer.provider";
import { CustomerCategoryAddDialog } from "./components/dialogs/add";
import { CustomerCategoryTable } from "./components/table";
import { CustomerCategoryDeleteDialog } from "./components/dialogs/delete";
import { CustomerCategoryEditDialog } from "./components/dialogs/edit";
import { useTranslations } from "next-intl";

export function CustomerCategoryTemplate() {
  return (
    <CustomerCategoriesProvider>
      <InnerTemplate />
    </CustomerCategoriesProvider>
  );
}

const InnerTemplate = () => {
  const { set } = useQueryState();
  const t = useTranslations("customer_categories");
  return (
    <>
      <MainContainer>
        <PageHeader
          title={t("title")}
          description={t("description")}
        />
        <Button onClick={() => set("dialog", "add")}>{t("addButton")}</Button>

        <CustomerCategoryTable />
      </MainContainer>

      <CustomerCategoryAddDialog />
      <CustomerCategoryEditDialog />
      <CustomerCategoryDeleteDialog />
    </>
  );
};
