"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Loader2, Check, X, ExternalLink } from "lucide-react";
import { mockBookings } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function AdminBookingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    if (!session) return;
    if (user?.role !== "ADMIN") { router.push("/dashboard"); return; }
    setBookings(mockBookings.map((b) => ({ ...b, user: { name: "John Doe" } })));
    setLoading(false);
  }, [session, user, router]);

  const confirmBooking = async () => {
    if (!meetingLink) { toast.error("Please enter a meeting link"); return; }
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Booking confirmed!");
    setBookings(bookings.map((b) => b.id === selectedBooking.id ? { ...b, status: "CONFIRMED", meetingLink } : b));
    setShowModal(false);
    setMeetingLink("");
  };

  const cancelBooking = async (id: string) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Booking cancelled");
    setBookings(bookings.map((b) => b.id === id ? { ...b, status: "CANCELLED" } : b));
  };

  if (!session || user?.role !== "ADMIN") return null;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-7 h-7" /> Booking Management
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
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Date</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Time</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Status</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Meeting Link</th>
                    <th className="text-left px-6 py-3 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{b.user?.name || "Unknown"}</td>
                      <td className="px-6 py-4 text-slate-600">{b.preferredDate}</td>
                      <td className="px-6 py-4 text-slate-600">{b.preferredTime}</td>
                      <td className="px-6 py-4">
                        {b.status === "CONFIRMED" ? <Badge variant="success">Confirmed</Badge> :
                         b.status === "CANCELLED" ? <Badge variant="danger">Cancelled</Badge> :
                         <Badge variant="warning">Pending</Badge>}
                      </td>
                      <td className="px-6 py-4">
                        {b.meetingLink ? (
                          <a href={b.meetingLink} target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Link
                          </a>
                        ) : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {b.status === "PENDING" && (
                            <>
                              <Button size="sm" onClick={() => { setSelectedBooking(b); setShowModal(true); }}>
                                <Check className="w-3 h-3 mr-1" /> Confirm
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => cancelBooking(b.id)}>
                                <X className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm Booking">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Send meeting link for {selectedBooking?.user?.name}'s session.</p>
          <Input label="Meeting Link" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} placeholder="https://zoom.us/j/..." required />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={confirmBooking}>Confirm & Send</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
