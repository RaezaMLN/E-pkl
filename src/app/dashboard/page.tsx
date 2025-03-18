"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const checkRole = async () => {
      try {
        const adminDoc = await getDoc(doc(db, "admin", user.uid));
        if (adminDoc.exists()) {
          router.push("/dashboard/admin");
          return;
        }

        const siswaDoc = await getDoc(doc(db, "siswa", user.uid));
        if (siswaDoc.exists()) {
          router.push("/dashboard/siswa");
          return;
        }

        router.push("/login");
      } catch (error) {
        console.error("Error fetching user role:", error);
        router.push("/login");
      }
    };

    checkRole();
  }, [user, router]);

  if (loading) return <p>Loading...</p>;

  return null;
}
