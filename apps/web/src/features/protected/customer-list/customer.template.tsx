"use client";
import MainContainer from "@/components/containers/container-with-action";
import { PageHeader } from "@/components/molecules/page-header";
import { Button } from "@/components/ui/button";
import { CustomerProvider } from "./provider/customer.provider";
import { useQueryState } from "@/hooks/use-query-state";
import { DialogCustomerAdd } from "./dialogs/add";
import { useTranslations } from "next-intl";

export function CustomerTemplate() {
  return (
    <CustomerProvider>
      <InnerTemplate />
    </CustomerProvider>
  );
}

const InnerTemplate = () => {
  const { set } = useQueryState();
  const t = useTranslations("customers");
  return (
    <>
      <MainContainer>
        <PageHeader
          title={t("title")}
          description={t("description")}
        />
        <Button onClick={() => set("dialog", "add")}>{t("addButton")}</Button>
      </MainContainer>

      <DialogCustomerAdd />
    </>
  );
};
