"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/providers/auth-context";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow rounded-lg p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Siswa PKL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">120</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jumlah Perusahaan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">30</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengajuan Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">10</p>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-6" onClick={logout}>
        Logout
      </Button>
    </motion.div>
  );
}
