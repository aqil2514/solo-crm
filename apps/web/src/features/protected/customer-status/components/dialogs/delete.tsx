import { CustomerStatusBase } from "../../interfaces/customer-status.interface";
import { BaseDeleteDialog } from "@/components/molecules/base-delete-dialog";
import { useCustomerStatusData } from "../../provider/customer-status.provider";
import { useTranslations } from "next-intl";
import { useResourceAction } from "@/hooks/use-resources-action";

export function CustomerStatusDeleteDialog() {
  const t = useTranslations("customer_status");
  const { refetch } = useCustomerStatusData();

  const {
    data,
    handleClose,
    isLoadingData,
    isSubmitting,
    isOpen,
    performAction,
  } = useResourceAction<CustomerStatusBase>({
    resourceKey: "customer-status",
    idParamKey: "statusId",
    endpoint: "/customer/status",
    dialogType: "delete",
    refetchList: refetch,
    translations: {
      pending: t("toast.deletePending"),
      success: t("toast.deleteSuccess"),
    },
  });

  return (
    <BaseDeleteDialog
      open={isOpen}
      onOpenChange={handleClose}
      data={data}
      onConfirm={performAction}
      isLoadingData={isLoadingData}
      isDeleting={isSubmitting}
      description={t("dialog.deleteDescription")}
      title={t("dialog.deleteTitle")}
    />
  );
}