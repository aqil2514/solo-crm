import { BaseDialog } from "@/components/molecules/base-dialog";
import { useQueryState } from "@/hooks/use-query-state";
import { CustomerForm } from "../forms";
import { useTranslations } from "next-intl";

export function DialogCustomerAdd() {
  const { get, remove } = useQueryState();
  const t = useTranslations("customers.dialog");
  const open = get("dialog") === "add";
  const closeDialog = (open: boolean) => {
    if (!open) return remove("dialog");
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={closeDialog}
      title={t("addTitle")}
      description={t("addDescription")}
    >
      <CustomerForm />
    </BaseDialog>
  );
}
