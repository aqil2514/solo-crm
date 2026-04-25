import { CustomerStatus } from "@/features/protected/customer-status/customer-status.template";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata():Promise<Metadata>{
    const locale = await getLocale()
    return {
        title: locale === "en" ? "Customer Status" : "Status Pelanggan"
    }
}

export default function CustomerStatusPage(){
    return <CustomerStatus />
}