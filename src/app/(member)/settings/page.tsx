"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Settings, Save, LogOut } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.currentPassword || !form.newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      if (!res.ok) throw new Error("Failed to update password");
      toast.success("Password updated successfully!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-7 h-7" /> Account Settings
        </h1>
        <p className="text-slate-500 mt-1">Manage your account settings and password.</p>
      </motion.div>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Name" value={user?.name || ""} disabled />
              <Input label="Email" value={user?.email || ""} disabled />
            </div>
            <p className="text-xs text-slate-400 mt-2">Edit your profile information from the <a href="/profile" className="text-rose-600 hover:underline">Profile page</a>.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input label="Current Password" type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} required />
              <Input label="New Password" type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />
              <Input label="Confirm New Password" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
              <Button type="submit" loading={loading}>
                <Save className="w-4 h-4 mr-2" /> Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Account</h2>
            <Button variant="danger" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
