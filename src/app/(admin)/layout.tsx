import { AppSidebar } from "@/layouts/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { QueryProvider } from "@/components/providers/tanstack-provider";
import { AppHeader } from "@/layouts/app-header";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="floating" />
        <SidebarInset>
          <AppHeader />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </QueryProvider>
  );
}
