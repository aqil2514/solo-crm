import { CustomerCategoryTemplate } from "@/features/protected/customer-category/customer-category.template";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "en" ? "Customer Category" : "Kategori Pelanggan",
  };
}

export default function CustomerCategoryPage() {
  return <CustomerCategoryTemplate />;
}
