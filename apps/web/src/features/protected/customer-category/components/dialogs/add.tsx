import { BaseAddDialog } from "@/components/molecules/base-add-dialog";
import { CustomerCategoryForm } from "../forms";
import { CustomerCategorySchemaType } from "../../schema/customer-category.schema";
import { useCustomerCategoriesData } from "../../provider/customer.provider";
import { useTranslations } from "next-intl";
import { useResourceAction } from "@/hooks/use-resources-action";

export function CustomerCategoryAddDialog() {
  const { refetch } = useCustomerCategoriesData();
  const t = useTranslations("customer_categories");

  const { isOpen, handleClose, performAction } =
    useResourceAction<CustomerCategorySchemaType>({
      resourceKey: "customer-category",
      endpoint: "/customer/categories",
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
      renderForm={() => <CustomerCategoryForm onSubmit={performAction} />}
    />
  );
}