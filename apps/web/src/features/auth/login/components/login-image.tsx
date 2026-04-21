import Image from "next/image";

export function LoginImage() {
  return (
    <div className="relative h-full w-full">
      <Image
        alt="Login page image"
        src="/login-bg.jpg"
        fill
        className="object-cover brightness-[0.8]"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white">
        <h2 className="text-2xl font-bold">Solo CRM</h2>
        <p className="text-sm opacity-80">Manage your business like a pro.</p>
      </div>
    </div>
  );
}
