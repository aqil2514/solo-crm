import { CustomerStatusForm } from "../forms";
import { CustomerStatusSchemaType } from "../../schema/customer-status.schema";
import { useCustomerStatusData } from "../../provider/customer-status.provider";
import { CustomerStatusBase } from "../../interfaces/customer-status.interface";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { BaseEditDialog } from "@/components/molecules/base-edit-dialog";
import { useResourceAction } from "@/hooks/use-resources-action";

export function CustomerStatusEditDialog() {
  const { refetch } = useCustomerStatusData();
  const t = useTranslations("customer_status");

  const { data, handleClose, isLoadingData, isOpen, performAction } =
    useResourceAction<CustomerStatusBase>({
      resourceKey: "customer-status",
      idParamKey: "statusId",
      endpoint: "/customer/status",
      dialogType: "edit",
      refetchList: refetch,
      translations: {
        pending: t("toast.editPending"),
        success: t("toast.editSuccess"),
      },
    });

  const formValues = useMemo<CustomerStatusSchemaType | undefined>(() => {
    if (!data) return undefined;
    return {
      name: data.name,
      description: data.description,
    };
  }, [data]);

  return (
    <BaseEditDialog
      open={isOpen}
      onOpenChange={handleClose}
      title={t("dialog.editTitle")}
      description={t("dialog.editDescription")}
      isLoadingData={isLoadingData}
      renderForm={() => (
        <CustomerStatusForm
          onSubmit={performAction}
          defaultValues={formValues}
        />
      )}
    />
  );
}