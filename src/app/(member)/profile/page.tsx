"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, User, Heart, Target } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import toast from "react-hot-toast";
import { mockUserProfile } from "@/lib/mock-data";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", phone: "", gender: "", dateOfBirth: "", country: "", state: "", city: "",
    occupation: "", about: "", lookingFor: "Serious Relationship", hobbies: "",
    religion: "", willingToRelocate: "", preferredAgeMin: "18", preferredAgeMax: "99",
    preferredLocation: "", relationshipGoal: "", photo: "",
  });

  useEffect(() => {
    if (!session) return;
    const d = mockUserProfile;
    setForm({
      name: d.name || "",
      phone: d.phone || "",
      gender: d.gender || "",
      dateOfBirth: d.dateOfBirth || "",
      country: d.country || "",
      state: d.state || "",
      city: d.city || "",
      occupation: d.occupation || "",
      about: d.about || "",
      lookingFor: d.lookingFor || "Serious Relationship",
      hobbies: d.hobbies || "",
      religion: d.religion || "",
      willingToRelocate: d.willingToRelocate === true ? "Yes" : d.willingToRelocate === false ? "No" : "",
      preferredAgeMin: d.preferredAgeMin?.toString() || "18",
      preferredAgeMax: d.preferredAgeMax?.toString() || "99",
      preferredLocation: d.preferredLocation || "",
      relationshipGoal: d.relationshipGoal || "",
      photo: d.photo || "",
    });
    setFetching(false);
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Profile updated successfully!");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    router.push("/login");
    return null;
  }

  const steps = [
    { label: "Personal Info", icon: User },
    { label: "Preferences", icon: Target },
    { label: "About You", icon: Heart },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1">Update your profile to get better matches.</p>
      </motion.div>

      {/* Stepper */}
      <div className="flex items-center gap-2 my-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isDone = i < step;
          return (
            <div key={s.label} className="flex items-center flex-1">
              <button
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "bg-rose-100 text-rose-600" : isDone ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-400"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className="flex-1 h-0.5 mx-2 bg-slate-200" />}
            </div>
          );
        })}
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
                  <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }]} placeholder="Select gender" />
                  <Input label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Country" name="country" value={form.country} onChange={handleChange} />
                  <Input label="State/City" name="state" value={form.state} onChange={handleChange} />
                </div>
                <Input label="Occupation" name="occupation" value={form.occupation} onChange={handleChange} />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <Select label="Relationship Goal" name="relationshipGoal" value={form.relationshipGoal} onChange={handleChange} options={[{ value: "Marriage", label: "Marriage" }, { value: "Serious Relationship", label: "Serious Relationship" }]} placeholder="Select goal" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Preferred Age (Min)" name="preferredAgeMin" type="number" value={form.preferredAgeMin} onChange={handleChange} />
                  <Input label="Preferred Age (Max)" name="preferredAgeMax" type="number" value={form.preferredAgeMax} onChange={handleChange} />
                </div>
                <Input label="Preferred Location" name="preferredLocation" value={form.preferredLocation} onChange={handleChange} placeholder="City, Country" />
                <Select label="Religion/Faith" name="religion" value={form.religion} onChange={handleChange} options={[{ value: "Christianity", label: "Christianity" }, { value: "Islam", label: "Islam" }, { value: "Other", label: "Other" }, { value: "None", label: "None" }]} placeholder="Select religion" />
                <Select label="Willing to Relocate" name="willingToRelocate" value={form.willingToRelocate} onChange={handleChange} options={[{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }]} placeholder="Select option" />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">About Me</label>
                  <textarea name="about" rows={4} value={form.about} onChange={handleChange} placeholder="Tell us about yourself..." className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">What I'm Looking For</label>
                  <textarea name="lookingFor" rows={3} value={form.lookingFor} onChange={handleChange} placeholder="Describe your ideal partner..." className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none" />
                </div>
                <Input label="Hobbies & Interests" name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Reading, traveling, cooking..." />
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              <div>
                {step > 0 && (
                  <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                {step < steps.length - 1 ? (
                  <Button type="button" onClick={() => setStep(step + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" loading={loading}>
                    <Save className="w-4 h-4 mr-2" /> Save Profile
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
