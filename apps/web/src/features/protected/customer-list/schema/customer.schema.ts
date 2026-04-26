// TODO : i18n belum
import { phoneFieldSchema } from "@/components/forms/form-field-phone";
import { z } from "zod";

export const createCustomerSchema = (t: (key: string) => string) => z.object({
  // Identitas Dasar
  name: z
    .string()
    .min(3, t("validation.nameMin"))
    .max(100, t("validation.nameMax")),

  phone: phoneFieldSchema,

  email: z.string().email(t("validation.emailInvalid")).optional().or(z.literal("")),

  // Alamat (Penting untuk pengiriman hasil tani/warung)
  address: z
    .string()
    .max(500, t("validation.addressMax"))
    .optional()
    .or(z.literal("")),

  // Segmentasi & Status
  category: z.string(),
  newCategory: z.string().optional(),

  status: z.string(),
  newStatus: z.string().optional(),

  // Catatan Khusus CRM
  notes: z
    .string()
    .max(1000, t("validation.notesMax"))
    .optional()
    .or(z.literal("")),

  // Metadata (Jika dibutuhkan untuk input manual saldo awal atau tags)
  tags: z.array(z.string()).default([]),
})
.superRefine((data, ctx) => {
  if (data.category === "__add_new__" && !data.newCategory) {
    ctx.addIssue({
      code: "custom",
      message: t("validation.newCategoryRequired"),
      path: ["newCategory"],
    });
  }
  if (data.status === "__add_new__" && !data.newStatus) {
    ctx.addIssue({
      code: "custom",
      message: t("validation.newStatusRequired"),
      path: ["newStatus"],
    });
  }
});

export const customerSchema = z.object({
  // Identitas Dasar
  name: z
    .string()
    .min(3, "Nama minimal harus 3 karakter")
    .max(100, "Nama terlalu panjang"),

  phone: phoneFieldSchema,

  email: z.email("Format email tidak valid").optional().or(z.literal("")),

  // Alamat (Penting untuk pengiriman hasil tani/warung)
  address: z
    .string()
    .max(500, "Alamat maksimal 500 karakter")
    .optional()
    .or(z.literal("")),

  // Segmentasi & Status
  category: z.string(),
  newCategory: z.string().optional(),

  status: z.string(),
  newStatus: z.string().optional(),

  // Catatan Khusus CRM
  notes: z
    .string()
    .max(1000, "Catatan maksimal 1000 karakter")
    .optional()
    .or(z.literal("")),

  // Metadata (Jika dibutuhkan untuk input manual saldo awal atau tags)
  tags: z.array(z.string()).default([]),
})
.superRefine((data, ctx) => {
  if (data.category === "__add_new__" && !data.newCategory) {
    ctx.addIssue({
      code: "custom",
      message: "Nama kategori baru wajib diisi",
      path: ["newCategory"],
    });
  }
  if (data.status === "__add_new__" && !data.newStatus) {
    ctx.addIssue({
      code: "custom",
      message: "Nama status baru wajib diisi",
      path: ["newStatus"],
    });
  }
});;

// Infer type untuk keperluan TypeScript
export type CustomerSchema = z.infer<typeof customerSchema>;
export type CustomerSchemaInput = z.input<typeof customerSchema>;
export type CustomerSchemaOutput = z.output<typeof customerSchema>;

export const defaultValuesCustomer: CustomerSchema = {
  category: "",
  name: "",
  status: "",
  tags: [],
  address: "",
  email: "",
  notes: "",
  phone: "",
};
