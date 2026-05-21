import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background gap-8">
      <Image src="/images/mdd.svg" alt="Mdd logo" width={200} height={100} loading="eager" style={{ height: "auto" }} />
      <h1 className="text-3xl font-bold text-foreground">Monde de Dév</h1>
      <p className="text-muted-foreground text-center max-w-sm">
        Rejoignez la communauté des développeurs passionnés.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">S&apos;inscrire</Link>
        </Button>
      </div>
    </main>
  );
}
