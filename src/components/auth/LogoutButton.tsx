// src/components/auth/LogoutButton.tsx
"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      className="w-full bg-red-500 hover:bg-red-600"
    >
      Logout
    </Button>
  );
}
