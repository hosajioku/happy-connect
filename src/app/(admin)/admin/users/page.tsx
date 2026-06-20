"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Search, Shield, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  gender: string | null;
  country: string | null;
  membership?: { plan: string; status: string } | null;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!session) return;
    if (user?.role !== "ADMIN") { router.push("/dashboard"); return; }
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session, user, router]);

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (!session || user?.role !== "ADMIN") return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7" /> User Management
          </h1>
        </motion.div>
        <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="w-4 h-4" />} className="max-w-xs" />
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
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Email</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Role</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Plan</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Joined</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{u.name}</td>
                      <td className="px-6 py-4 text-slate-600">{u.email}</td>
                      <td className="px-6 py-4">
                        {u.role === "ADMIN" ? <Badge variant="info">Admin</Badge> : <Badge>User</Badge>}
                      </td>
                      <td className="px-6 py-4">
                        {u.membership?.plan === "PREMIUM" ? <Badge variant="premium">Premium</Badge> : <Badge>Free</Badge>}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
