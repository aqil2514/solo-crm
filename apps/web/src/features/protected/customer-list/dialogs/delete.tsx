import { CustomerBase } from "../interfaces/customer.interface";
import { BaseDeleteDialog } from "@/components/molecules/base-delete-dialog";
import { useCustomerData } from "../provider/customer.provider";
import { useTranslations } from "next-intl";
import { useResourceAction } from "@/hooks/use-resources-action";

export function DialogCustomerDelete() {
  const t = useTranslations("customers");
  const { refetch } = useCustomerData();

  const {
    data,
    handleClose,
    isLoadingData,
    isSubmitting,
    isOpen,
    performAction,
  } = useResourceAction<CustomerBase>({
    resourceKey: "customer",
    idParamKey: "customerId",
    endpoint: "/customer/list",
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