"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { mockPayments } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function AdminSubscriptionsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    if (user?.role !== "ADMIN") { router.push("/dashboard"); return; }
    setPayments(mockPayments);
    setLoading(false);
  }, [session, user, router]);

  const approvePayment = async (id: string) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Payment approved");
    setPayments(payments.map((p) => p.id === id ? { ...p, status: "APPROVED" } : p));
  };

  if (!session || user?.role !== "ADMIN") return null;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-7 h-7" /> Subscription Management
        </h1>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">User</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Amount</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Reference</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Status</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Date</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{p.user?.name || "Unknown"}</td>
                      <td className="px-6 py-4">₦{p.amount?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs">{p.reference}</td>
                      <td className="px-6 py-4">
                        {p.status === "APPROVED" ? <Badge variant="success">Approved</Badge> :
                         p.status === "FAILED" ? <Badge variant="danger">Failed</Badge> :
                         <Badge variant="warning">Pending</Badge>}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        {p.status !== "APPROVED" && (
                          <Button size="sm" onClick={() => approvePayment(p.id)}>Approve</Button>
                        )}
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
