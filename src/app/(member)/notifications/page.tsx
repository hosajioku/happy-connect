"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Heart, Loader2, CheckCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  type: string;
  link: string | null;
  createdAt: string;
}

export default function NotificationsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => {
        if (data.notifications) setNotifications(data.notifications);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  if (!session) {
    router.push("/login");
    return null;
  }

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", { method: "PUT" });
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-7 h-7 text-rose-500" /> Notifications
          </h1>
        </motion.div>
        {notifications.some((n) => !n.read) && (
          <button onClick={markAllRead} className="text-sm text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>
      ) : notifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No notifications</h3>
            <p className="text-slate-500">You're all caught up!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className={!notif.read ? "border-l-4 border-l-rose-500" : ""}>
                <CardContent className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.read ? "bg-slate-100" : "bg-rose-100"}`}>
                    <Bell className={`w-5 h-5 ${notif.read ? "text-slate-400" : "text-rose-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${notif.read ? "text-slate-600" : "text-slate-900 font-medium"}`}>
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-slate-400">{formatDate(notif.createdAt)}</span>
                      {!notif.read && <Badge variant="danger">New</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
