"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, Loader2, Heart, CheckCircle, XCircle, Crown } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import toast from "react-hot-toast";
import { mockBookings } from "@/lib/mock-data";

interface Booking {
  id: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  meetingLink: string | null;
  notes: string | null;
  createdAt: string;
}

export default function BookingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ preferredDate: "", preferredTime: "", notes: "" });
  const isPremium = (user as any)?.membership === "PREMIUM";

  useEffect(() => {
    if (!session) return;
    setBookings(mockBookings);
    setLoading(false);
  }, [session]);

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.preferredDate || !form.preferredTime) {
      toast.error("Please select date and time");
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Booking request submitted!");
      setShowModal(false);
      setForm({ preferredDate: "", preferredTime: "", notes: "" });
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED": return <Badge variant="success">Confirmed</Badge>;
      case "CANCELLED": return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge variant="warning">Pending</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Matchmaking Sessions</h1>
          <p className="text-slate-500 mt-1">Book a private session with Happy.</p>
        </motion.div>
        <Button onClick={() => setShowModal(true)} disabled={!isPremium}>
          <Calendar className="w-4 h-4 mr-2" /> Book Session
        </Button>
      </div>

      {!isPremium && (
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="flex items-center gap-4">
            <Crown className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-800">Premium feature</p>
              <p className="text-sm text-amber-600">Upgrade to Premium to book private matchmaking sessions.</p>
            </div>
            <a href="/upgrade" className="ml-auto">
              <Button variant="accent" size="sm">Upgrade</Button>
            </a>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>
      ) : bookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No bookings yet</h3>
            <p className="text-slate-500">Book your first private matchmaking session.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div key={booking.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900">{booking.preferredDate}</span>
                        <span className="text-sm text-slate-500">at {booking.preferredTime}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span>Booked {new Date(booking.createdAt).toLocaleDateString()}</span>
                        {statusBadge(booking.status)}
                      </div>
                      {booking.meetingLink && (
                        <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer" className="text-sm text-rose-600 hover:underline mt-1 inline-flex items-center gap-1">
                          <Video className="w-3 h-3" /> Join Meeting
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Book a Matchmaking Session">
        <form onSubmit={handleBook} className="space-y-4">
          <Input label="Preferred Date" type="date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} required />
          <Select label="Preferred Time" value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} options={[
            { value: "09:00", label: "9:00 AM" }, { value: "10:00", label: "10:00 AM" },
            { value: "11:00", label: "11:00 AM" }, { value: "12:00", label: "12:00 PM" },
            { value: "14:00", label: "2:00 PM" }, { value: "15:00", label: "3:00 PM" },
            { value: "16:00", label: "4:00 PM" }, { value: "17:00", label: "5:00 PM" },
          ]} placeholder="Select time" required />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes (Optional)</label>
            <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Anything you'd like to discuss..." className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none" />
          </div>
          <Button type="submit" fullWidth loading={submitting}>
            <Calendar className="w-4 h-4 mr-2" /> Submit Booking
          </Button>
        </form>
      </Modal>
    </div>
  );
}
