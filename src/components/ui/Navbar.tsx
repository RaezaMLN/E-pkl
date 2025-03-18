"use client";

import { useAuth } from "@/providers/auth-context";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
}
