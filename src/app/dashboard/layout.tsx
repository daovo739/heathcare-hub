import { Sidebar } from '@/components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1">
        {/* Main Content */}
        <div className="flex-1 p-12 bg-[#F7F5F1] overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
