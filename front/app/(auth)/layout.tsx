import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <Image
          src="/images/mdd.svg"
          alt="Mdd logo"
          width={200}
          height={100}
          className="mx-auto"
        />
        <CardContent className="px-8 pb-4">{children}</CardContent>
      </Card>
    </main>
  );
}
