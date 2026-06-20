"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Heart, MapPin, Calendar, Users, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockMatches } from "@/lib/mock-data";
import { getCompatibilityLabel } from "@/lib/matching";

interface Match {
  id: string;
  score: number;
  factors: Record<string, number>;
  matchedUser: {
    id: string;
    name: string;
    photo: string | null;
    age?: number;
    country?: string;
    state?: string;
    occupation?: string;
    about?: string;
    hobbies?: string;
    religion?: string;
    lookingFor?: string;
  };
}

export default function MatchesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (!session) return;
    setMatches(mockMatches);
    setLoading(false);
  }, [session]);

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-amber-500" /> AI Match Recommendations
          </h1>
          <p className="text-slate-500 mt-1">Your compatible matches based on our smart algorithm.</p>
        </motion.div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
        </div>
      ) : matches.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No matches yet</h3>
            <p className="text-slate-500 max-w-md mx-auto">Complete your profile to get AI match recommendations tailored to you.</p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, i) => {
            const { label, color } = getCompatibilityLabel(match.score);
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card hover>
                  <CardContent>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white text-xl font-bold">
                        {match.matchedUser.name[0]}
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${color}`}>{match.score}%</div>
                        <Badge variant={match.score >= 70 ? "success" : match.score >= 50 ? "warning" : "default"}>
                          {label}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900">{match.matchedUser.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {match.matchedUser.occupation && `${match.matchedUser.occupation} · `}
                      {match.matchedUser.country}
                    </p>
                    {match.matchedUser.about && (
                      <p className="text-sm text-slate-600 mt-3 line-clamp-2">{match.matchedUser.about}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {match.matchedUser.religion && (
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">{match.matchedUser.religion}</span>
                      )}
                      {match.matchedUser.hobbies?.split(",").slice(0, 2).map((h: string) => (
                        <span key={h} className="text-xs bg-rose-50 px-2 py-1 rounded-full text-rose-600">{h.trim()}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match, i) => {
            const { label, color } = getCompatibilityLabel(match.score);
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card hover>
                  <CardContent className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {match.matchedUser.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-slate-900">{match.matchedUser.name}</h3>
                        <span className={`text-sm font-semibold ${color}`}>{match.score}% {label}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        {match.matchedUser.occupation && `${match.matchedUser.occupation} · `}
                        {match.matchedUser.country}
                      </p>
                      {match.matchedUser.about && (
                        <p className="text-sm text-slate-600 mt-1 line-clamp-1">{match.matchedUser.about}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
