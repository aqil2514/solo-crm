import { CustomerCategoryBase } from "../../interfaces/customer-category.interface";
import { BaseDeleteDialog } from "@/components/molecules/base-delete-dialog";
import { useCustomerCategoriesData } from "../../provider/customer.provider";
import { useTranslations } from "next-intl";
import { useResourceAction } from "@/hooks/use-resources-action";

export function CustomerCategoryDeleteDialog() {
  const t = useTranslations("customer_categories");
  const { refetch } = useCustomerCategoriesData();

  const {
    data,
    handleClose,
    isLoadingData,
    isSubmitting,
    isOpen,
    performAction,
  } = useResourceAction<CustomerCategoryBase>({
    resourceKey: "customer-category",
    idParamKey: "categoryId",
    endpoint: "/customer/categories",
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
