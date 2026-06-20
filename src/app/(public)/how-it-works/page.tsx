"use client";

import { motion } from "framer-motion";
import { UserPlus, FileText, Sparkles, Heart, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Create Your Account",
    desc: "Sign up with your details. It takes less than 2 minutes.",
    details: ["Provide basic information", "Verify your email", "Set your preferences"],
  },
  {
    icon: FileText,
    title: "2. Complete Your Profile",
    desc: "Tell us about yourself and what you're looking for.",
    details: ["Add your photos", "Answer compatibility questions", "Share your interests"],
  },
  {
    icon: Sparkles,
    title: "3. Get AI Matches",
    desc: "Our smart algorithm finds your most compatible matches.",
    details: ["Receive daily match suggestions", "View compatibility scores", "Browse profiles"],
  },
  {
    icon: Heart,
    title: "4. Connect & Chat",
    desc: "Start conversations with your matches.",
    details: ["Send messages", "Express interest", "Get to know each other"],
  },
  {
    icon: Calendar,
    title: "5. Book Private Sessions",
    desc: "Premium members can book private matchmaking sessions.",
    details: ["Choose your preferred time", "Meet with Happy personally", "Get expert guidance"],
  },
  {
    icon: MessageCircle,
    title: "6. Find Your Match",
    desc: "Build a meaningful relationship with your perfect match.",
    details: ["Go on virtual dates", "Deepen your connection", "Find lasting love"],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
              Your Journey to{" "}
              <span className="gradient-text">Finding Love</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
              Six simple steps to find your perfect match on Happy Connect.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="flex-1">
                  <div className={`w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4 ${isEven ? "" : "md:ml-auto"}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-slate-900 mb-3 ${isEven ? "" : "md:text-right"}`}>
                    {step.title}
                  </h3>
                  <p className={`text-slate-600 mb-4 ${isEven ? "" : "md:text-right"}`}>{step.desc}</p>
                  <ul className={`space-y-2 ${isEven ? "" : "md:text-right"}`}>
                    {step.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden md:flex items-center justify-center w-24">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-8">Join thousands of serious singles looking for love.</p>
          <Link href="/register">
            <Button size="lg">
              Create Your Free Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
