interface UserData {
  id: string;
  dateOfBirth?: string | null;
  country?: string | null;
  state?: string | null;
  relationshipGoal?: string | null;
  religion?: string | null;
  hobbies?: string | null;
  willingToRelocate?: boolean | null;
  preferredAgeMin?: number | null;
  preferredAgeMax?: number | null;
  preferredLocation?: string | null;
  lookingFor?: string | null;
  gender?: string | null;
}

function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function calculateCompatibility(userA: UserData, userB: UserData): { score: number; factors: Record<string, number> } {
  const factors: Record<string, number> = {};
  let totalScore = 0;
  const weights = {
    age: 0.30,
    location: 0.25,
    goal: 0.20,
    religion: 0.10,
    interests: 0.10,
    relocation: 0.05,
  };

  if (userA.dateOfBirth && userB.dateOfBirth) {
    const ageA = calculateAge(userA.dateOfBirth);
    const ageB = calculateAge(userB.dateOfBirth);
    const ageDiff = Math.abs(ageA - ageB);
    const preferredMin = userA.preferredAgeMin ?? 18;
    const preferredMax = userA.preferredAgeMax ?? 99;
    const inRange = ageB >= preferredMin && ageB <= preferredMax;
    const ageScore = inRange ? Math.max(0, 100 - ageDiff * 8) : Math.max(0, 50 - ageDiff * 5);
    factors.age = Math.round(ageScore * weights.age);
    totalScore += factors.age;
  }

  if (userA.country && userB.country) {
    const sameCountry = userA.country.toLowerCase() === userB.country.toLowerCase();
    const sameState = userA.state?.toLowerCase() === userB.state?.toLowerCase();
    let locScore = 0;
    if (sameCountry && sameState) locScore = 100;
    else if (sameCountry) locScore = 70;
    else locScore = 20;
    factors.location = Math.round(locScore * weights.location);
    totalScore += factors.location;
  }

  if (userA.relationshipGoal && userB.relationshipGoal) {
    const goalScore = userA.relationshipGoal.toLowerCase() === userB.relationshipGoal.toLowerCase() ? 100 : 30;
    factors.goal = Math.round(goalScore * weights.goal);
    totalScore += factors.goal;
  }

  if (userA.religion && userB.religion) {
    const relScore = userA.religion.toLowerCase() === userB.religion.toLowerCase() ? 100 : 40;
    factors.religion = Math.round(relScore * weights.religion);
    totalScore += factors.religion;
  }

  if (userA.hobbies && userB.hobbies) {
    const hobbiesA = userA.hobbies.toLowerCase().split(/[,;]/).map((h) => h.trim());
    const hobbiesB = userB.hobbies.toLowerCase().split(/[,;]/).map((h) => h.trim());
    const matches = hobbiesA.filter((h) => hobbiesB.includes(h)).length;
    const maxHobbies = Math.max(hobbiesA.length, hobbiesB.length);
    const intScore = maxHobbies > 0 ? (matches / maxHobbies) * 100 : 0;
    factors.interests = Math.round(intScore * weights.interests);
    totalScore += factors.interests;
  }

  if (userA.willingToRelocate !== null && userB.willingToRelocate !== undefined) {
    const relocScore = userA.willingToRelocate === userB.willingToRelocate ? 100 : 50;
    factors.relocation = Math.round(relocScore * weights.relocation);
    totalScore += factors.relocation;
  }

  const maxPossible = Object.values(weights).reduce((s, w) => s + w * 100, 0);
  const finalScore = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  return { score: Math.min(100, Math.max(0, finalScore)), factors };
}

export function getCompatibilityLabel(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "Excellent Match", color: "text-green-600" };
  if (score >= 70) return { label: "Great Match", color: "text-emerald-600" };
  if (score >= 50) return { label: "Good Match", color: "text-yellow-600" };
  if (score >= 30) return { label: "Fair Match", color: "text-orange-500" };
  return { label: "Low Match", color: "text-red-500" };
}
