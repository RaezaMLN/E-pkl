"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ Gunakan Link agar tidak refresh
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nama: "",
    nisn: "",
    email: "",
    password: "",
    kelas: "",
    no_hp: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "siswa", user.uid), {
        nama: form.nama,
        nisn: form.nisn,
        email: form.email,
        kelas: form.kelas,
        no_hp: form.no_hp,
        status_pkl: "belum memilih",
        id_perusahaan: null,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError("Pendaftaran gagal, periksa kembali data Anda.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Daftar Akun Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="nisn"
                placeholder="NISN"
                value={form.nisn}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="kelas"
                placeholder="Kelas"
                value={form.kelas}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="no_hp"
                placeholder="No HP"
                value={form.no_hp}
                onChange={handleChange}
                required
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Mendaftar..." : "Daftar"}
              </Button>
            </form>

            {/* ✅ Link ke halaman login tanpa refresh */}
            <p className="mt-4 text-sm text-center">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login di sini
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
