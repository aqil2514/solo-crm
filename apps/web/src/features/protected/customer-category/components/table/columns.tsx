import { ColumnDef } from "@tanstack/react-table";
import { CustomerCategoryBase } from "../../interfaces/customer-category.interface";
import { createActionColumn } from "@/components/tables/action-column";
import { Edit, Trash } from "lucide-react";
import { useQueryState } from "@/hooks/use-query-state";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("customer_categories");
  const tTable = useTranslations("customer_categories.table");
  const tActions = useTranslations("customer_categories.actions");

  const columns = createActionColumn<CustomerCategoryBase>({
    columns: [
      {
        accessorKey: "name",
        header: tTable("name"),
      },
      {
        accessorKey: "description",
        header: tTable("description"),
        cell: ({ row }) => row.original.description ?? tTable("noDescription"),
      },
    ],
    getMenuItems: ({ id }) => [
      {
        label: tActions("edit"),
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
        label: tActions("delete"),
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
