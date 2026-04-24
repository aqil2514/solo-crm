import { createResourceContext } from "@/context/create-resource-context";

const { Provider, useData } = createResourceContext(["customer"], "customer");

export { Provider as CustomerProvider, useData as useCustomerData };
