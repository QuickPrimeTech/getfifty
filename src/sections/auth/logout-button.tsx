"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import React from "react";

type LogoutButtonProps = {
  children: React.ReactNode;
};
export function LogoutButton({
  children,
  onClick,
  ...props
}: LogoutButtonProps & React.ComponentProps<"button">) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button onClick={logout} {...props}>
      <LogOut /> {children}
    </button>
  );
}
