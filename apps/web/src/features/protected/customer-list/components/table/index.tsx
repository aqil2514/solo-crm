import { DataTable } from "@/components/tables/data-table";
import { useCustomerData } from "../../provider/customer.provider";
import { useCustomerColumns } from "./columns";

export function CustomerTable() {
  const { data } = useCustomerData();
  const columns = useCustomerColumns();

  return <DataTable columns={columns} data={data ?? []} />;
}
