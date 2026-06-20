"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, Save, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function AdminContentPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as any;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!session) return;
    if (user?.role !== "ADMIN") { router.push("/dashboard"); return; }
    setContent({
      "home-hero-title": "Find Your Perfect Match",
      "home-hero-subtitle": "Connecting serious singles for meaningful relationships",
      "pricing-free-desc": "Basic access to our platform",
      "pricing-premium-desc": "Full access including private matchmaking",
      "announcement": "Welcome to the new Happy Connect platform!",
      "about-mission": "To help serious singles find lasting love.",
      "about-vision": "A world where everyone finds their perfect match.",
    });
    setLoading(false);
  }, [session, user, router]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Content updated!");
    setSaving(false);
  };

  if (!session || user?.role !== "ADMIN") return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-7 h-7" /> Content Management
          </h1>
        </motion.div>
        <Button onClick={handleSave} loading={saving}>
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-rose-500" /></div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-4">Homepage</h3>
              <div className="space-y-4">
                <Input label="Hero Title" value={content["home-hero-title"] || ""} onChange={(e) => setContent({ ...content, "home-hero-title": e.target.value })} />
                <Input label="Hero Subtitle" value={content["home-hero-subtitle"] || ""} onChange={(e) => setContent({ ...content, "home-hero-subtitle": e.target.value })} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-4">Pricing Page</h3>
              <div className="space-y-4">
                <Input label="Free Plan Description" value={content["pricing-free-desc"] || ""} onChange={(e) => setContent({ ...content, "pricing-free-desc": e.target.value })} />
                <Input label="Premium Plan Description" value={content["pricing-premium-desc"] || ""} onChange={(e) => setContent({ ...content, "pricing-premium-desc": e.target.value })} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-4">Announcements</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Announcement Text</label>
                <textarea
                  rows={3}
                  value={content["announcement"] || ""}
                  onChange={(e) => setContent({ ...content, "announcement": e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                  placeholder="Enter announcement..."
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-4">About Us</h3>
              <div className="space-y-4">
                <Input label="Mission Statement" value={content["about-mission"] || ""} onChange={(e) => setContent({ ...content, "about-mission": e.target.value })} />
                <Input label="Vision Statement" value={content["about-vision"] || ""} onChange={(e) => setContent({ ...content, "about-vision": e.target.value })} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
