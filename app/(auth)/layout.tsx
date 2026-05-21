import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-center">
          <Image
            src="/images/mdd.svg"
            alt="Mdd logo"
            width={200}
            height={100}
          />
        </CardHeader>
        <CardContent className="px-8 pb-4">{children}</CardContent>
        <CardFooter className="justify-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:underline"
          >
            <ArrowLeft className="size-4" /> Retour à l&apos;accueil
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
