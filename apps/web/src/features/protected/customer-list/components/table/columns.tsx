import { createActionColumn } from "@/components/tables/action-column";
import { Trash } from "lucide-react";
import { useQueryState } from "@/hooks/use-query-state";
import { useTranslations } from "next-intl";
import { CustomerBase } from "../../interfaces/customer.interface";

export function useCustomerColumns() {
  const { update } = useQueryState();
  const tTable = useTranslations("customers.table");
  const tActions = useTranslations("customers.actions");

  const columns = createActionColumn<CustomerBase>({
    columns: [
      {
        accessorKey: "name",
        header: tTable("name"),
      },
      {
        accessorKey: "phone_number",
        header: tTable("phone"),
      },
      {
        accessorKey: "email",
        header: tTable("email"),
      },
      {
        id: "category",
        header: tTable("category"),
        accessorFn: (row) => row.category?.name ?? "-",
      },
      {
        id: "status",
        header: tTable("status"),
        accessorFn: (row) => row.status?.name ?? "-",
      },
      {
        accessorKey: "address",
        header: tTable("address"),
      },
      {
        accessorKey: "notes",
        header: tTable("notes"),
      },
      {
        id: "tags",
        header: tTable("tags"),
        cell: ({ row }) => row.original.tags?.join(", ") || "-",
      },
    ],
    getMenuItems: ({ id }) => [
      {
        label: tActions("delete"),
        icon: Trash,
        onClick: () => {
          update({
            dialog: "delete",
            customerId: id,
          });
        },
        variant: "danger",
      },
    ],
    dropdownLabel: ({ name }) => `Customer ${name}`,
    position: "start",
    actionAlignment: "right",
  });

  return columns;
}
