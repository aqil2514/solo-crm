import { BaseAddDialog } from "@/components/molecules/base-add-dialog";
import { useTranslations } from "next-intl";
import { useResourceAction } from "@/hooks/use-resources-action";
import { CustomerStatusForm } from "../forms";
import { CustomerStatusSchemaType } from "../../schema/customer-status.schema";
import { useCustomerStatusData } from "../../provider/customer-status.provider";

export function CustomerStatusAddDialog() {
  const { refetch } = useCustomerStatusData();
  const t = useTranslations("customer_status");

  const { isOpen, handleClose, performAction } =
    useResourceAction<CustomerStatusSchemaType>({
      resourceKey: "customer-status",
      endpoint: "/customer/status",
      dialogType: "add",
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
      renderForm={() => <CustomerStatusForm onSubmit={performAction} />}
    />
  );
}