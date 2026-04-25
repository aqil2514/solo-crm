/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonLoading } from "@/components/atoms/button-loading";
import { BaseDialog } from "@/components/molecules/base-dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface BaseDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  isLoadingData?: boolean;
  isDeleting?: boolean;
  onConfirm: () => void;
  // Mode 1: Kirim data mentah untuk auto-mapping
  data?: Record<string, any>;
  // Mode 2: Custom render jika butuh tampilan beda
  renderInfo?: ReactNode;
  // Opsional: Label untuk mapping data
  template?: Record<string, string>;
}

export function BaseDeleteDialog({
  open,
  onOpenChange,
  title = "Hapus Data",
  description = "Aksi ini tidak dapat dibatalkan. Seluruh data terkait akan dihapus secara permanen.",
  isLoadingData,
  isDeleting,
  onConfirm,
  data,
  renderInfo,
  template,
}: BaseDeleteDialogProps) {
  
  // Fungsi internal untuk merender list key-value jika data disediakan
  const renderDataList = () => {
    if (!data) return null;

    const displayKeys = template ? Object.keys(template) : Object.keys(data);
    const ignoredKeys = ["id", "userId", "created_at", "updated_at", "deleted_at"];

    return (
      <div className="rounded-xl border border-red-100 bg-red-50/40 p-4 space-y-3">
        {displayKeys.map((key) => {
          const value = data[key];
          if (ignoredKeys.includes(key) || value === null || value === undefined) return null;

          return (
            <div key={key} className="flex flex-col border-b border-red-100/50 pb-2 last:border-0 last:pb-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500/80">
                {template ? template[key] : key.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-semibold text-zinc-900 wrap-break-word">
                {typeof value === "object" ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      variant="danger"
      size="md"
    >
      <div className="space-y-6">
        <div className="min-h-15">
          {isLoadingData ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-zinc-100 rounded w-3/4" />
              <div className="h-12 bg-zinc-100 rounded w-full" />
            </div>
          ) : (
            // Prioritaskan renderInfo, jika tidak ada baru renderDataList
            renderInfo || renderDataList()
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="text-zinc-500"
          >
            Batal
          </Button>
          <ButtonLoading
            variant="destructive"
            onClick={onConfirm}
            isLoading={isDeleting}
            loadingText="Menghapus..."
          >
            Ya, Hapus
          </ButtonLoading>
        </div>
      </div>
    </BaseDialog>
  );
}