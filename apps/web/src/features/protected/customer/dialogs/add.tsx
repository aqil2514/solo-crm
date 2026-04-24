import { BaseDialog } from "@/components/molecules/base-dialog";
import { useQueryState } from "@/hooks/use-query-state";

export function DialogCustomerAdd() {
  const { get, remove } = useQueryState();
  const open = get("dialog") === "add";
  const closeDialog = (open: boolean) => {
    if (!open) return remove("dialog");
  };
  
  return (
    <BaseDialog
      open={open}
      onOpenChange={closeDialog}
      title="Tambah Pelanggan Baru"
      description="Masukkan detail pelanggan Anda di sini. Klik simpan jika sudah selesai."
    >
      {/* Masukkan Form Zod Anda di sini */}
      <p>Form input akan berada di sini...</p>
    </BaseDialog>
  );
}
