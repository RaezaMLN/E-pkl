"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login, user, token, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Cek apakah user sudah login, jika iya arahkan ke dashboard sesuai role
  useEffect(() => {
    if (user || token) {
      const userRole = JSON.parse(atob(token!.split(".")[1])).role;
      if (userRole === "admin") {
        router.push("/dashboard/admin");
      } else if (userRole === "siswa") {
        router.push("/dashboard/siswa");
      }
    }
  }, [user, token, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password); // Proses login
      router.push("/dashboard"); // Redirect ke dashboard setelah login berhasil
    } catch (err) {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -50 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            {/* Link ke Registrasi (Tanpa Refresh) */}
            <p className="mt-4 text-sm text-center">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Daftar di sini
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}