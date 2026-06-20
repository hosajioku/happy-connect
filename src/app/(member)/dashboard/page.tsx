"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, Users, Calendar, ArrowRight, Bell, CreditCard, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;

  const [stats, setStats] = useState({
    matches: 0,
    notifications: 0,
    bookings: 0,
    membership: "FREE",
  });

  useEffect(() => {
    if (!session) return;
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setStats({
            matches: data.matchesCount || 0,
            notifications: data.notificationsCount || 0,
            bookings: data.bookingsCount || 0,
            membership: data.membership || "FREE",
          });
        }
      })
      .catch(console.error);
  }, [session]);

  if (!session) {
    router.push("/login");
    return null;
  }

  const quickLinks = [
    { href: "/profile", label: "Complete Profile", icon: Users, color: "from-rose-500 to-pink-500" },
    { href: "/matches", label: "View Matches", icon: Sparkles, color: "from-amber-400 to-orange-500" },
    { href: "/upgrade", label: "Upgrade Plan", icon: CreditCard, color: "from-emerald-500 to-teal-500" },
    { href: "/bookings", label: "Book Session", icon: Calendar, color: "from-violet-500 to-purple-500" },
  ];

  const statCards = [
    { label: "AI Matches", value: stats.matches, icon: Sparkles, color: "text-amber-500" },
    { label: "Notifications", value: stats.notifications, icon: Bell, color: "text-rose-500" },
    { label: "Bookings", value: stats.bookings, icon: Calendar, color: "text-blue-500" },
    { label: "Plan", value: stats.membership, icon: Heart, color: stats.membership === "PREMIUM" ? "text-amber-500" : "text-slate-400" },
  ];

  return (
    <div>
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl lg:text-3xl font-bold text-slate-900"
        >
          Welcome back, {user?.name?.split(" ")[0] || "there"}!
        </motion.h1>
        <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your love journey.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
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

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Quick Actions
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {quickLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-slate-700">{link.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        <div>
          <Card className="gradient-bg text-white">
            <CardContent>
              <Heart className="w-8 h-8 mb-3 text-rose-200" />
              <h3 className="font-semibold mb-2">
                {stats.membership === "PREMIUM" ? "Premium Member" : "Free Member"}
              </h3>
              <p className="text-sm text-rose-100">
                {stats.membership === "PREMIUM"
                  ? "Enjoying private matchmaking and priority support."
                  : "Upgrade to unlock private matchmaking sessions with Happy."}
              </p>
              {stats.membership !== "PREMIUM" && (
                <Link href="/upgrade">
                  <button className="mt-4 px-4 py-2 bg-white text-rose-600 rounded-lg text-sm font-semibold hover:bg-rose-50 transition-colors">
                    Upgrade Now <ArrowRight className="w-3 h-3 inline ml-1" />
                  </button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {!user?.onboardingComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-amber-200 bg-amber-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800">Complete your profile</p>
                  <p className="text-sm text-amber-600">Get better match suggestions by filling out your profile.</p>
                </div>
              </div>
              <Link href="/profile">
                <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
                  Complete Now
                </button>
              </Link>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
