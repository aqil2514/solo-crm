import { DataTable } from "@/components/tables/data-table";
import { useCustomerStatusColumns } from "./columns";
import { useCustomerStatusData } from "../../provider/customer-status.provider";

export function CustomerStatusTable() {
  const { data } = useCustomerStatusData();
  const columns = useCustomerStatusColumns();
  return (
    <>
      <DataTable columns={columns} data={data ?? []} />
    </>
  );
}
