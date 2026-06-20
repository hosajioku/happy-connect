"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User, Phone, MapPin, Calendar, Eye, EyeOff, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import toast from "react-hot-toast";

const countries = [
  { value: "Nigeria", label: "Nigeria" },
  { value: "Ghana", label: "Ghana" },
  { value: "Kenya", label: "Kenya" },
  { value: "South Africa", label: "South Africa" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Other", label: "Other" },
];

const goals = [
  { value: "Marriage", label: "Marriage" },
  { value: "Serious Relationship", label: "Serious Relationship" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", gender: "", dateOfBirth: "",
    country: "", state: "", relationshipGoal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Name, email, and password are required");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-rose-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Create Your Account</h1>
            <p className="text-slate-600 mt-2">
              Join Happy Connect and find your perfect match
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                icon={<User className="w-4 h-4" />}
                required
              />
              <Select
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                placeholder="Select gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                icon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                value={form.phone}
                onChange={handleChange}
                icon={<Phone className="w-4 h-4" />}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                icon={<Calendar className="w-4 h-4" />}
              />
              <Select
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Select country"
                options={countries}
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="State/City"
                name="state"
                placeholder="Lagos"
                value={form.state}
                onChange={handleChange}
              />
              <Select
                label="Relationship Goal"
                name="relationshipGoal"
                value={form.relationshipGoal}
                onChange={handleChange}
                placeholder="What are you looking for?"
                options={goals}
              />
            </div>

            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              icon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-rose-600 font-semibold hover:text-rose-700">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
