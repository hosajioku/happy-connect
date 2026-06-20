"use client";

import { useState } from "react";
import { useSession } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Crown, CheckCircle, Heart, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import toast from "react-hot-toast";

const PREMIUM_FEATURES = [
  "Unlimited AI match recommendations",
  "Full compatibility breakdown",
  "Unlimited messages",
  "Access private matchmaking sessions",
  "Priority review & support",
  "Manual matchmaking by Happy",
  "Personalized dating advice",
];

export default function UpgradePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = session?.user as any;

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      toast.success("Welcome to Premium! 🎉");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <Crown className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-900">Upgrade to Premium</h1>
        <p className="text-slate-500 mt-2">Unlock the full Happy Connect experience.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="border-amber-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400/20 to-transparent w-32 h-32 rounded-bl-full" />
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                <Crown className="w-6 h-6 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900">Premium Plan</h2>
              </div>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-slate-900">₦9,999</span>
                <span className="text-slate-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {PREMIUM_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                fullWidth
                size="lg"
                variant="accent"
                onClick={handleUpgrade}
                loading={loading}
                className="animate-pulse-glow"
              >
                <Crown className="w-4 h-4 mr-2" /> Upgrade Now – ₦9,999/month
              </Button>
              <p className="text-xs text-slate-500 text-center mt-3">Paystack secure payment. Cancel anytime.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" /> What You Get
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Premium membership gives you access to exclusive features designed to help you 
                find your perfect match faster. From private matchmaking sessions with Happy 
                to unlimited AI recommendations, we've got you covered.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-3">Secure Payment</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                All payments are processed securely through Paystack, a leading African payment 
                gateway. Your payment information is encrypted and never stored on our servers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-3">Cancel Anytime</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No long-term contracts. You can cancel your subscription at any time. 
                Your premium benefits remain active until the end of the billing period.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
