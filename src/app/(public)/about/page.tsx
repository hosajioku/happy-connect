"use client";

import { motion } from "framer-motion";
import { Heart, Target, Eye, Shield, CheckCircle } from "lucide-react";

const values = [
  { icon: Heart, title: "Love & Care", desc: "Every connection is built on genuine care and respect." },
  { icon: Shield, title: "Trust & Safety", desc: "All profiles are verified to ensure authentic connections." },
  { icon: Target, title: "Intentional", desc: "Focused on serious relationships and marriage." },
  { icon: Eye, title: "Privacy", desc: "Your personal information is always protected." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
              We Believe in{" "}
              <span className="gradient-text">Real Love</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
              Happy Connect was founded with a simple mission: to help serious singles find 
              meaningful, lasting relationships. We combine technology with a personal touch 
              to create the best matchmaking experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
          >
            <Heart className="w-10 h-10 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To provide a trusted platform where serious singles can find compatible partners 
              for meaningful relationships and marriage, combining AI technology with 
              personalized matchmaking services.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
          >
            <Eye className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To become Africa's most trusted matchmaking platform, helping millions of 
              singles find their perfect match and build happy, lasting marriages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Our Core Values</h2>
            <p className="text-slate-600 mt-4">What drives everything we do at Happy Connect</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl hover:bg-rose-50 transition-colors"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl gradient-bg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">The Story Behind Happy Connect</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Happy Connect was created by a team who saw the struggles singles face in finding 
              genuine connections. Tired of superficial dating apps, we built a platform focused 
              on what truly matters: compatibility, intention, and lasting love.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mt-4">
              Our name reflects our belief that everyone deserves to be happy and connected 
              with someone who truly understands them. We're not just another dating app — 
              we're a matchmaking service committed to your love story.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
