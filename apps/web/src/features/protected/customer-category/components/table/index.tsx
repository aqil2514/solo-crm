import { DataTable } from "@/components/tables/data-table";
import { useCustomerCategoriesData } from "../../provider/customer.provider";
import { useCustomerCategoryColumns } from "./columns";

export function CustomerCategoryTable() {
  const { data } = useCustomerCategoriesData();
  const columns = useCustomerCategoryColumns();
  return (
    <>
      <DataTable columns={columns} data={data ?? []} />
    </>
  );
}
