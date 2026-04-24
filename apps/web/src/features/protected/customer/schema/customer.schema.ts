import { z } from "zod";

export const customerSchema = z.object({
  // Identitas Dasar
  name: z
    .string()
    .min(3, "Nama minimal harus 3 karakter")
    .max(100, "Nama terlalu panjang"),

  // WhatsApp/Telepon (Sangat krusial untuk pasar Indonesia)
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka")
    .optional()
    .or(z.literal("")), // Mengizinkan string kosong jika opsional

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
