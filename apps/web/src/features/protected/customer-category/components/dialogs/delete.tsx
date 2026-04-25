import { useFetch } from "@/hooks/use-fetch";
import { useQueryState } from "@/hooks/use-query-state";
import { CustomerCategoryBase } from "../../interfaces/customer-category.interface";
import { BaseDeleteDialog } from "@/components/molecules/base-delete-dialog";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/toast/error";
import { useCustomerCategoriesData } from "../../provider/customer.provider";
import { useState } from "react";

export function CustomerCategoryDeleteDialog() {
  const { get, update } = useQueryState();
  const { refetch } = useCustomerCategoriesData();
  const open = get("dialog") === "delete";
  const categoryId = get("categoryId");
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading } = useFetch<CustomerCategoryBase>(
    [`customer-category-${categoryId}`],
    `/customer/categories/${categoryId}`,
    !!categoryId,
  );

  const handleClose = (open: boolean) => {
    if (!open)
      return update({
        dialog: null,
        categoryId: null,
      });
  };

  if (!data) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    await toast
      .promise(api.delete(`/customer/categories/${categoryId}`), {
        error: {
          render(props) {
            return getErrorMessage(props.data);
          },
        },
        pending: "Menghapus Data...",
        success: "Data berhasil dihapus",
      })
      .then(() => {
        refetch();
        handleClose(false);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <BaseDeleteDialog
      open={open}
      onOpenChange={handleClose}
      data={data}
      onConfirm={handleDelete}
      isLoadingData={isLoading}
      isDeleting={isDeleting}
      description="Data yang dihapus tidak akan dikembalikan. Kategori dari pelanggan dengan kategori ini pun akan diubah menjadi belum disetting"
      title="Hapus Kategori"
    />
  );
}
