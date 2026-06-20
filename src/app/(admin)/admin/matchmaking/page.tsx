"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { mockAdminUsers } from "@/lib/mock-data";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function AdminMatchmakingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    if (user?.role !== "ADMIN") { router.push("/dashboard"); return; }
    setUsers(mockAdminUsers.map((u) => ({
      id: u.id,
      name: u.name,
      gender: null,
      country: null,
      lookingFor: null,
      religion: null,
      membership: { plan: u.membership, status: "ACTIVE" },
    })));
    setLoading(false);
  }, [session, user, router]);

  const generateMatches = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Matches generated for all users!");
  };

  if (!session || user?.role !== "ADMIN") return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-500" /> Matchmaking
          </h1>
        </motion.div>
        <Button onClick={generateMatches}>
          Generate AI Matches
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Name</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Gender</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Location</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Looking For</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Religion</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{u.name}</td>
                      <td className="px-6 py-4 text-slate-600">{u.gender || "—"}</td>
                      <td className="px-6 py-4 text-slate-600">{u.country || "—"}</td>
                      <td className="px-6 py-4 text-slate-600">{u.lookingFor || "—"}</td>
                      <td className="px-6 py-4 text-slate-600">{u.religion || "—"}</td>
                      <td className="px-6 py-4">
                        {u.membership?.plan === "PREMIUM" ? <span className="text-amber-600 font-medium">Premium</span> : "Free"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
