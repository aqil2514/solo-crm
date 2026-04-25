import { createResourceContext } from "@/context/create-resource-context";
import { CustomerCategoryBase } from "../interfaces/customer-category.interface";

const { Provider, useData } = createResourceContext<CustomerCategoryBase[]>(
  ["customer-categories"],
  "customer/categories",
);

export {
  Provider as CustomerCategoriesProvider,
  useData as useCustomerCategoriesData,
};
