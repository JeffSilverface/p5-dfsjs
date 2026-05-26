import { Header } from "@/components/organisms/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto p-4 md:p-6">{children}</div>
    </main>
  );
}
