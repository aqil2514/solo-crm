import { LoginTemplate } from "@/features/auth/login/login.template";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("login");
  return {
    title: t("pageTitle"),
  };
}

export default function LoginPage() {
  return <LoginTemplate />;
}
