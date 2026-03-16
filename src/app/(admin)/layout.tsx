import { AppSidebar } from "@/layouts/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { QueryProvider } from "@/components/providers/tanstack-provider";
import { AppHeader } from "@/layouts/app-header";
import { Toaster } from "@/components/ui/sonner";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { OnboardingBanner } from "@/sections/onboarding/banner";

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
          <main className="flex-1 overflow-auto p-4">
            <OnboardingBanner />
            {children}
          </main>
        </SidebarInset>
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "group font-sans border-border rounded-xl shadow-lg",
              title: "font-bold text-sm",
              description: "text-xs text-muted-foreground",
              actionButton: "bg-primary text-primary-foreground",
              cancelButton: "bg-muted text-muted-foreground",
            },
          }}
          icons={{
            success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
            error: <AlertCircle className="w-4 h-4 text-destructive" />,
            info: <Info className="w-4 h-4 text-blue-500" />,
            loading: <Spinner />,
          }}
        />
      </SidebarProvider>
    </QueryProvider>
  );
}
