import { CustomerForm } from "../forms";
import { useTranslations } from "next-intl";
import { BaseAddDialog } from "@/components/molecules/base-add-dialog";
import { useResourceAction } from "@/hooks/use-resources-action";
import { useCustomerData } from "../provider/customer.provider";

export function DialogCustomerAdd() {
  const t = useTranslations("customers");
  const { refetch } = useCustomerData();
  const { isOpen, handleClose, performAction } = useResourceAction({
    dialogType: "add",
    resourceKey: "customer",
    endpoint: "/customer/list",
    refetchList: refetch,
    translations: {
      pending: t("toast.addPending"),
      success: t("toast.addSuccess"),
    },
  });

  return (
    <BaseAddDialog
      open={isOpen}
      onOpenChange={handleClose}
      title={t("dialog.addTitle")}
      description={t("dialog.addDescription")}
      renderForm={() => <CustomerForm onSubmit={performAction} />}
    />
  );
}
