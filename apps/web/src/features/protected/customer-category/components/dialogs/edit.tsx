import { BaseDialog } from "@/components/molecules/base-dialog";
import { useQueryState } from "@/hooks/use-query-state";
import { CustomerCategoryForm } from "../forms";
import { CustomerCategorySchemaType } from "../../schema/customer-category.schema";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useCustomerCategoriesData } from "../../provider/customer.provider";
import { getErrorMessage } from "@/lib/toast/error";
import { useFetch } from "@/hooks/use-fetch";
import { CustomerCategoryBase } from "../../interfaces/customer-category.interface";
import { useMemo } from "react";

export function CustomerCategoryEditDialog() {
  const { refetch } = useCustomerCategoriesData();
  const { get, update } = useQueryState();
  const open = get("dialog") === "edit";
  const categoryId = get("categoryId");

  const { data, isLoading } = useFetch<CustomerCategoryBase>(
    [`customer-category-${categoryId}`],
    `/customer/categories/${categoryId}`,
    !!categoryId,
  );

  const handleClose = (open: boolean) => {
    if (!open) return update({ dialog: null, categoryId: null });
  };

  const submitHandler = async (values: CustomerCategorySchemaType) => {
    await toast
      .promise(api.patch(`/customer/categories/${categoryId}`, values), {
        pending: "Sedang update kategori...",
        success: "Kategori berhasil diupdate",
        error: {
          render({ data }) {
            return getErrorMessage(data);
          },
        },
      })
      .then(() => {
        refetch();
        handleClose(false);
      });
  };

  const formValues = useMemo<CustomerCategorySchemaType | undefined>(() => {
    if (!data) return undefined;

    return {
      name: data.name,
      description: data.description,
    };
  }, [data]);

  if (!data) return null;

  return (
    <BaseDialog
      open={open}
      onOpenChange={handleClose}
      title="Edit Kategori Pelanggan"
      description="Ubah kategori pelanggan yang sudah ada"
      size="lg"
    >
      <CustomerCategoryForm onSubmit={submitHandler} defaultValues={formValues} />
    </BaseDialog>
  );
}
