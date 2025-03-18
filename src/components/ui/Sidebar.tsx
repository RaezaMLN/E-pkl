"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Home, Users, FileText, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Data Siswa", href: "/data-siswa", icon: Users },
  { name: "Laporan PKL", href: "/laporan-pkl", icon: FileText },
  { name: "Pengaturan", href: "/pengaturan", icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.aside
      initial={{ width: isOpen ? 200 : 60 }}
      animate={{ width: isOpen ? 200 : 60 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-gray-900 text-white flex flex-col p-4"
    >
      {/* Tombol Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 flex items-center justify-center p-2 rounded-md hover:bg-gray-800"
      >
        <Menu size={24} />
      </button>

      {/* Navigasi */}
      <nav className="flex flex-col gap-2">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link key={href} href={href}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800"
            >
              <Icon size={24} />
              {isOpen && <span>{name}</span>}
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
