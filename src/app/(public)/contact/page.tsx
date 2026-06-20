"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send message");
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Contact</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
              Get In{" "}
              <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
              Have questions? We'd love to hear from you. Send us a message and we'll respond.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl border border-slate-100 p-8 lg:p-10 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-rose-500" />
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Your Name" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <Input label="Your Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                    required
                  />
                </div>
                <Button type="submit" fullWidth size="lg" loading={loading}>
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Email Us</h3>
                <p className="text-slate-600 text-sm mt-1">hello@happyconnect.com</p>
                <p className="text-slate-500 text-xs mt-1">We reply within 24 hours</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Call Us</h3>
                <p className="text-slate-600 text-sm mt-1">+234 800 HAPPY</p>
                <p className="text-slate-500 text-xs mt-1">Mon-Fri 9am-6pm WAT</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Visit Us</h3>
                <p className="text-slate-600 text-sm mt-1">Lagos, Nigeria</p>
                <p className="text-slate-500 text-xs mt-1">By appointment only</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-3xl p-8 text-white">
              <Heart className="w-10 h-10 mb-4 text-rose-200" />
              <h3 className="text-xl font-bold mb-2">Ready to Find Love?</h3>
              <p className="text-rose-100 text-sm">Join Happy Connect today and let us help you find your perfect match.</p>
              <a href="/register">
                <Button variant="accent" className="mt-4">
                  Get Started Free
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
