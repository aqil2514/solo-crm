import { createResourceContext } from "@/context/create-resource-context";
import { CustomerStatusBase } from "../interfaces/customer-status.interface";

const { Provider, useData } = createResourceContext<CustomerStatusBase[]>(
  ["customer-status"],
  "customer/status",
);

export {
  Provider as CustomerStatusProvider,
  useData as useCustomerStatusData,
};
