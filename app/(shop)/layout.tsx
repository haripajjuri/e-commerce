// app/(main)/layout.tsx
// Adjust path to your component

import Header from "@/componenets/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-svh">

        <Header />
        
        <main className="flex-1 flex">
            {children}
        </main>

    </div>
  );
}