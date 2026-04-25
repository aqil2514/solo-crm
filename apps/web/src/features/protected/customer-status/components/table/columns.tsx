import { createActionColumn } from "@/components/tables/action-column";
import { Edit, Trash } from "lucide-react";
import { useQueryState } from "@/hooks/use-query-state";
import { useTranslations } from "next-intl";
import { CustomerStatusBase } from "../../interfaces/customer-status.interface";

export function useCustomerStatusColumns() {
  const { update } = useQueryState();
  const tTable = useTranslations("customer_status.table");
  const tActions = useTranslations("customer_status.actions");

  const columns = createActionColumn<CustomerStatusBase>({
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
            statusId: id,
          });
        },
        variant: "info",
      },
      {
        label: tActions("delete"),
        icon: Trash,
        onClick: () => {
          update({
            dialog: "delete",
            statusId: id,
          });
        },
        variant: "danger",
      },
    ],
    dropdownLabel: ({ name }) => `Status ${name}`,
    position: "start",
    actionAlignment: "left",
  });

  return columns;
}
