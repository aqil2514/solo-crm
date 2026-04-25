import { BaseDialog } from "@/components/molecules/base-dialog";
import { useQueryState } from "@/hooks/use-query-state";
import { CustomerCategoryForm } from "../forms";
import { CustomerCategorySchemaType } from "../../schema/customer-category.schema";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useCustomerCategoriesData } from "../../provider/customer.provider";
import { getErrorMessage } from "@/lib/toast/error";

export function CustomerCategoryAddDialog() {
  const { refetch } = useCustomerCategoriesData();
  const { get, remove } = useQueryState();
  const open = get("dialog") === "add";
  const handleClose = (open: boolean) => {
    if (!open) return remove("dialog");
  };

  const submitHandler = async (values: CustomerCategorySchemaType) => {
    await toast
      .promise(api.post("/customer/categories", values), {
        pending: "Sedang menambah kategori...",
        success: "Kategori berhasil ditambah",
        error: {
          render({ data }) {
            return getErrorMessage(data);
          },
        },
      })
      .then(() => {
        refetch();
        remove("dialog");
      });
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={handleClose}
      title="Tambah Kategori Pelanggan"
      description="Berikan kategori agar mudah manajemennya"
      size="lg"
    >
      <CustomerCategoryForm onSubmit={submitHandler} />
    </BaseDialog>
  );
}
