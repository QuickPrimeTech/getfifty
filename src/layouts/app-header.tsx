import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { UserMenu } from "./user-menu";

export async function AppHeader() {
  return (
    <header className="sticky  bg-background top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) px-4">
      <div className="flex w-full items-center gap-1 lg:gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-bold">Dashboard</h1>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
