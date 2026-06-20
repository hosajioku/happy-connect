"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { Heart, Shield, Sparkles, Users, ArrowRight, CheckCircle, Star, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { icon: Users, value: "500+", label: "Active Members" },
  { icon: Heart, value: "50+", label: "Successful Matches" },
  { icon: Shield, value: "100%", label: "Verified Profiles" },
  { icon: Star, value: "4.9", label: "User Rating" },
];

const steps = [
  {
    icon: Users,
    title: "Create Your Profile",
    desc: "Sign up and tell us about yourself, your interests, and what you're looking for.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Get AI Matches",
    desc: "Our smart compatibility engine finds your most compatible matches.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Heart,
    title: "Connect & Find Love",
    desc: "Message your matches and let Happy guide you to your perfect partner.",
    color: "from-rose-600 to-rose-800",
  },
];

const testimonials = [
  {
    name: "Sarah & Michael",
    text: "Happy Connect helped us find each other. The compatibility matching was spot on!",
    rating: 5,
  },
  {
    name: "Amanda & David",
    text: "The private matchmaking sessions made all the difference. Truly personalized service.",
    rating: 5,
  },
  {
    name: "Grace & John",
    text: "I love how serious and intentional everyone is on this platform. Found my soulmate!",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-rose-50 via-white to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-rose-100/50 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl" />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-rose-400/30"
          />
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-20 w-6 h-6 rounded-full bg-amber-400/20"
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-rose-300/30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full text-rose-700 text-sm font-medium mb-6"
              >
                <Heart className="w-4 h-4" />
                Trusted by 500+ Singles
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight"
              >
                Find Your
                <span className="block gradient-text">Perfect Match</span>
                Today
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed"
              >
                Happy Connect connects serious singles for meaningful relationships and marriage. 
                Our AI-powered matching helps you find compatible partners who share your values.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Link href="/register">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex items-center gap-4 text-sm text-slate-500"
              >
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Verified profiles
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" /> AI matching
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Private sessions
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex relative justify-center"
            >
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full gradient-bg opacity-10 animate-pulse-glow" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-rose-200"
                  />
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-20 h-20 text-rose-500 mx-auto heart-icon" />
                    </motion.div>
                    <p className="text-2xl font-bold text-rose-600 mt-4">Happy Connect</p>
                    <p className="text-sm text-slate-500">Find Love Today</p>
                  </div>
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 -right-4 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs font-medium">500+ Active</span>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-16 -left-6 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-medium">4.9 Rating</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 lg:mt-20"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-8 h-8 text-rose-500 mx-auto mb-3" />
                  <p className="text-2xl lg:text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3">
              Three Simple Steps to Find Love
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              Getting started is easy. Create your profile, get matched, and connect with your perfect partner.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.title} delay={index * 0.15} className="text-center">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="relative">
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl font-bold text-slate-100 select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3">
                We Take Matchmaking Seriously
              </h2>
              <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                Unlike other dating apps, Happy Connect is built for people who want real, 
                meaningful relationships. Our platform combines AI technology with human touch 
                to create the perfect matchmaking experience.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "AI-powered compatibility matching",
                  "Verified profiles – no fake accounts",
                  "Private matchmaking sessions with experts",
                  "Serious community focused on marriage",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-rose-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/register">
                  <Button>
                    Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="gradient-bg p-8 lg:p-12 text-white">
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <Heart className="w-16 h-16 mb-6 text-rose-200" />
                  </motion.div>
                  <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed">
                    "Happy Connect changed my life. I found someone who shares my values, 
                    faith, and vision for the future. The matching algorithm is incredible."
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-300/30 flex items-center justify-center text-xl font-bold">
                      T
                    </div>
                    <div>
                      <p className="font-semibold">Tunde & Bisola</p>
                      <p className="text-sm text-rose-200">Matched on Happy Connect</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3">
              Real People, Real Connections
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.15}>
                <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-8 border border-rose-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                      {t.name.split(" & ").map(n => n[0]).join("")}
                    </div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-white/5"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full border border-white/5"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-12 h-12 text-rose-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Join Happy Connect today and take the first step towards finding a meaningful relationship.
            </p>
            <Link href="/register">
              <Button size="lg" variant="accent" className="text-base px-10 animate-pulse-glow">
                Create Free Account <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <p className="text-slate-400 text-sm mt-4">No credit card required. Free forever.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
