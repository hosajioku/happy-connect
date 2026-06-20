"use client";

import { motion } from "framer-motion";
import { CheckCircle, X, Heart, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    icon: Heart,
    color: "from-slate-400 to-slate-500",
    features: [
      { text: "Create your profile", included: true },
      { text: "Browse limited matches", included: true },
      { text: "Receive AI recommendations", included: true },
      { text: "View basic compatibility scores", included: true },
      { text: "Send up to 5 messages", included: true },
      { text: "Access private matchmaking sessions", included: false },
      { text: "Priority review", included: false },
      { text: "Manual matchmaking by Happy", included: false },
    ],
  },
  {
    name: "Premium",
    price: "9,999",
    period: "per month",
    icon: Crown,
    color: "from-amber-400 to-amber-600",
    popular: true,
    features: [
      { text: "Create your profile", included: true },
      { text: "Unlimited matches", included: true },
      { text: "Advanced AI recommendations", included: true },
      { text: "Full compatibility breakdown", included: true },
      { text: "Unlimited messages", included: true },
      { text: "Access private matchmaking sessions", included: true },
      { text: "Priority review & support", included: true },
      { text: "Manual matchmaking by Happy", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
              Start free and upgrade when you're ready for a more personalized matchmaking experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative bg-white rounded-3xl border-2 p-8 lg:p-10 ${
                  plan.popular ? "border-amber-400 shadow-xl shadow-amber-100" : "border-slate-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">₦{plan.price}</span>
                  <span className="text-slate-500 text-sm">/{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-slate-700" : "text-slate-400"}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href={plan.name === "Free" ? "/register" : "/upgrade"}>
                    <Button
                      variant={plan.popular ? "accent" : "outline"}
                      fullWidth
                      size="lg"
                      className={plan.popular ? "animate-pulse-glow" : ""}
                    >
                      {plan.name === "Free" ? "Get Started Free" : "Upgrade Now"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {plan.popular && (
                  <p className="text-xs text-slate-500 text-center mt-4">
                    Cancel anytime. No hidden fees.
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
