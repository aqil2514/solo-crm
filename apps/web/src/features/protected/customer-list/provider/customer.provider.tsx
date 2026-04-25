import { createResourceContext } from "@/context/create-resource-context";

const { Provider, useData } = createResourceContext(["customer-list"], "customer/list");

export { Provider as CustomerProvider, useData as useCustomerData };
