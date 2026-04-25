import z from "zod";

export const customerStatusSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type CustomerStatusSchemaType = z.infer<typeof customerStatusSchema>;

export const defaultCustomerStatus: CustomerStatusSchemaType = {
  name: "",
  description: "",
};
