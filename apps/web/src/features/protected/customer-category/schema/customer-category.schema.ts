import z from "zod";

export const customerCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type CustomerCategorySchemaType = z.infer<typeof customerCategorySchema>;

export const defaultCustomerCategory: CustomerCategorySchemaType = {
  name: "",
  description: "",
};
