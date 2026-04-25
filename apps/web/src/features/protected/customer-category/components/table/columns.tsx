import { ColumnDef } from "@tanstack/react-table";
import { CustomerCategoryBase } from "../../interfaces/customer-category.interface";
import { createActionColumn } from "@/components/tables/action-column";
import { Edit, Trash } from "lucide-react";
import { useQueryState } from "@/hooks/use-query-state";

const baseColumn: ColumnDef<CustomerCategoryBase>[] = [
  {
    accessorKey: "name",
    header: "Nama Kategori",
  },
  {
    accessorKey: "description",
    header: "Keterangan",
    cell: ({ row }) => row.original.description ?? "Belum ada keterangan",
  },
];

export function useCustomerCategoryColumns() {
  const { update } = useQueryState();
  const columns = createActionColumn<CustomerCategoryBase>({
    columns: baseColumn,
    getMenuItems: ({ id }) => [
      {
        label: "Edit Data",
        icon: Edit,
        onClick: () => {
          update({
            dialog: "edit",
            categoryId: id,
          });
        },
        variant:"info"
      },
      {
        label: "Hapus",
        icon: Trash,
        onClick: () => {
          update({
            dialog: "delete",
            categoryId: id,
          });
        },
        variant:"danger"
      },
    ],
    dropdownLabel: ({ name }) => `Kategori ${name}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
