"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, CreditCard, Heart, Calendar, Shield, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    if (user?.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session, user, router]);

  if (!session || user?.role !== "ADMIN") return null;

  const statCards = [
    { label: "Total Users", value: stats.totalUsers || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Premium Members", value: stats.premiumUsers || 0, icon: CreditCard, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Matches", value: stats.totalMatches || 0, icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Pending Bookings", value: stats.pendingBookings || 0, icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        </div>
        <p className="text-slate-500">Welcome back, {user?.name}</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card>
                    <CardContent className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardContent>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  {[
                    { href: "/admin/users", label: "Manage Users", icon: Users },
                    { href: "/admin/subscriptions", label: "View Subscriptions", icon: CreditCard },
                    { href: "/admin/bookings", label: "Review Bookings", icon: Calendar },
                    { href: "/admin/matchmaking", label: "Matchmaking", icon: Heart },
                  ].map((action) => {
                    const Icon = action.icon;
                    return (
                      <a key={action.href} href={action.href}>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                          <Icon className="w-5 h-5 text-slate-500" />
                          <span className="text-sm font-medium text-slate-700">{action.label}</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">System Overview</h2>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>Free Users</span>
                    <span className="font-semibold">{(stats.totalUsers || 0) - (stats.premiumUsers || 0)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>Premium Users</span>
                    <span className="font-semibold text-amber-600">{stats.premiumUsers || 0}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span>Match Suggestions</span>
                    <span className="font-semibold">{stats.totalMatches || 0}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Conversion Rate</span>
                    <span className="font-semibold">
                      {stats.totalUsers > 0 ? Math.round((stats.premiumUsers / stats.totalUsers) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
