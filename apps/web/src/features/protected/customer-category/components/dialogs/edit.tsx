import { CustomerCategoryForm } from "../forms";
import { CustomerCategorySchemaType } from "../../schema/customer-category.schema";
import { useCustomerCategoriesData } from "../../provider/customer.provider";
import { CustomerCategoryBase } from "../../interfaces/customer-category.interface";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { BaseEditDialog } from "@/components/molecules/base-edit-dialog";
import { useResourceAction } from "@/hooks/use-resources-action";

export function CustomerCategoryEditDialog() {
  const { refetch } = useCustomerCategoriesData();
  const t = useTranslations("customer_categories");

  const { data, handleClose, isLoadingData, isOpen, performAction } =
    useResourceAction<CustomerCategoryBase>({
      resourceKey: "customer-category",
      idParamKey: "categoryId",
      endpoint: "/customer/categories",
      dialogType: "edit",
      refetchList: refetch,
      translations: {
        pending: t("toast.editPending"),
        success: t("toast.editSuccess"),
      },
    });

  const formValues = useMemo<CustomerCategorySchemaType | undefined>(() => {
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
        <CustomerCategoryForm
          onSubmit={performAction}
          defaultValues={formValues}
        />
      )}
    />
  );
}
