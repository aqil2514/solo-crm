// TODO : i18n belum
import { phoneFieldSchema } from "@/components/forms/form-field-phone";
import { z } from "zod";

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

  status: z.string(),

  // Catatan Khusus CRM
  notes: z
    .string()
    .max(1000, "Catatan maksimal 1000 karakter")
    .optional()
    .or(z.literal("")),

  // Metadata (Jika dibutuhkan untuk input manual saldo awal atau tags)
  tags: z.array(z.string()).optional().default([]),
});

// Infer type untuk keperluan TypeScript
export type CustomerSchema = z.infer<typeof customerSchema>;

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
