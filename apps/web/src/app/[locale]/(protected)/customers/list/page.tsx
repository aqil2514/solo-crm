import { CustomerTemplate } from "@/features/protected/customer-list/customer.template";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata():Promise<Metadata>{
    const locale = await getLocale()
    return {
        title: locale === "en" ? "Customer List" : "Daftar Pelanggan"
    }
}

export default function CustomerListPage(){
    return <CustomerTemplate />
}