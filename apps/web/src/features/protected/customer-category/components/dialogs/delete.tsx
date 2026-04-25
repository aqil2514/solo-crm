import { ButtonLoading } from "@/components/atoms/button-loading";
import { BaseDialog } from "@/components/molecules/base-dialog";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { useQueryState } from "@/hooks/use-query-state";
import { CustomerCategoryBase } from "../../interfaces/customer-category.interface";

export function CustomerCategoryDeleteDialog() {
  const { get, update } = useQueryState();
  const open = get("dialog") === "delete";
  const categoryId = get("categoryId");

  const { data } = useFetch<CustomerCategoryBase>(
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

  return (
    <BaseDialog
      open={open}
      onOpenChange={handleClose}
      title="Hapus Kategori"
      description="Data yang dihapus tidak akan dikembalikan. Kategori dari pelanggan dengan kategori ini pun akan diubah menjadi belum disetting"
      variant="danger"
    >
      <ButtonLoading variant={"destructive"}>Hapus</ButtonLoading>
    </BaseDialog>
  );
}
