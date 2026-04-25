import { createResourceContext } from "@/context/create-resource-context";

const { Provider, useData } = createResourceContext(["customer-categories"], "customer/categories");

export { Provider as CustomerCategoriesProvider, useData as useCustomerCategoriesData };
