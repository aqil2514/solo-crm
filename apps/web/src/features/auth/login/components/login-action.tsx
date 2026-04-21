"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "@/constants/urls";

export function LoginAction() {
  const handleGoogleLogin = () => {
    // Menentukan ukuran dan posisi popup agar berada di tengah layar
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const url = `${serverUrl}/auth/google`;

    window.open(
      url,
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`
    );
  };

  return (
    <div className="w-full max-w-100 px-4"> {/* Mengubah max-w-100 menjadi 400px agar proporsional */}
      <Card className="border-none shadow-none md:shadow-sm md:border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Selamat Datang</CardTitle>
          <CardDescription>
            Gunakan akun Google Anda untuk mengakses dashboard Solo CRM
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="w-full py-6 text-base font-medium flex gap-3" // Tambah gap agar ikon & teks tidak menempel
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="text-xl" />
            Masuk dengan Google
          </Button>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
        Dengan melanjutkan, Anda menyetujui Ketentuan Layanan dan Kebijakan
        Privasi kami.
      </p>
    </div>
  );
}