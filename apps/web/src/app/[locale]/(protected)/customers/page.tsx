import { CustomerTemplate } from "@/features/protected/customer/customer.template";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata():Promise<Metadata>{
    const locale = await getLocale()
    return {
        title: locale === "en" ? "Customer" : "Pelanggan"
    }
}

export default function CustomerPage(){
    return <CustomerTemplate />
}