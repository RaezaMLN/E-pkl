"use client";

import { useAuth } from "@/providers/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Ambil pathname saat ini
  const [decodedRole, setDecodedRole] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        // Decode token untuk mendapatkan role
        const payload = JSON.parse(atob(token.split(".")[1]));
        setDecodedRole(payload.role); // Simpan role ke state
      } catch (error) {
        console.error("Token decoding error:", error);
        router.push("/login"); // Jika token invalid, arahkan ke login
      }
    }
  }, [token]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Jika tidak ada user, redirect ke halaman login
        if (pathname !== "/login") {
          router.push("/login");
        }
      } else if (decodedRole) {
        // Pastikan role sudah ada sebelum mengecek akses
        if (decodedRole === "admin" && !pathname.startsWith("/dashboard/admin")) {
          // Jika role admin, dan bukan di dashboard admin, redirect ke admin
          router.push("/dashboard/admin");
        } else if (decodedRole === "siswa" && !pathname.startsWith("/dashboard/siswa")) {
          // Jika role siswa, dan bukan di dashboard siswa, redirect ke siswa
          router.push("/dashboard/siswa");
        } else if (decodedRole !== "admin" && pathname.startsWith("/dashboard/admin")) {
          // Jika siswa mencoba akses dashboard admin, redirect ke dashboard siswa
          router.push("/dashboard/siswa");
        } else if (decodedRole !== "siswa" && pathname.startsWith("/dashboard/siswa")) {
          // Jika admin mencoba akses dashboard siswa, redirect ke dashboard admin
          router.push("/dashboard/admin");
        }
      }
    }
  }, [user, decodedRole, loading, router, pathname]); // Pastikan dependensi ini mencakup semua yang bisa berubah

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) return null; // Hindari tampilan kosong sebelum redirect

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Konten utama */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
