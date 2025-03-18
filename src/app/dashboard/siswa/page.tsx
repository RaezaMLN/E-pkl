"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/providers/auth-context";
import { motion } from "framer-motion";

export default function SiswaDashboard() {
  const { logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow rounded-lg p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Dashboard Siswa</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Status PKL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Sedang Berjalan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Laporan yang Dikirim</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perusahaan PKL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">PT. Telkom Indonesia</p>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-6" onClick={logout}>
        Logout
      </Button>
    </motion.div>
  );
}
