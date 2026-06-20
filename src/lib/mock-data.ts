export const mockUser = {
  matchesCount: 5,
  notificationsCount: 3,
  bookingsCount: 2,
  membership: "PREMIUM",
};

export const mockUserProfile = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+2348012345678",
  gender: "male",
  dateOfBirth: "1995-06-15",
  country: "Nigeria",
  state: "Lagos",
  city: "Ikeja",
  occupation: "Software Engineer",
  photo: null,
  about: "Looking for a serious and meaningful relationship",
  lookingFor: "marriage",
  hobbies: "Reading, Traveling, Music",
  religion: "Christianity",
  willingToRelocate: true,
  preferredAgeMin: 25,
  preferredAgeMax: 35,
  preferredLocation: "Lagos",
  relationshipGoal: "marriage",
  onboardingComplete: true,
  membership: "PREMIUM",
};

export const mockMatches = [
  {
    id: "m1",
    score: 92,
    factors: { age: 85, location: 95, goal: 100, religion: 90, interests: 88, relocation: 95 },
    matchedUser: {
      id: "u2",
      name: "Sarah Johnson",
      photo: null,
      age: 28,
      country: "Nigeria",
      state: "Lagos",
      occupation: "Product Designer",
      about: "Creative soul looking for a genuine connection. I love art, music, and deep conversations.",
      hobbies: "Art, Music, Yoga",
      religion: "Christianity",
      lookingFor: "marriage",
    },
  },
  {
    id: "m2",
    score: 85,
    factors: { age: 90, location: 80, goal: 95, religion: 85, interests: 75, relocation: 80 },
    matchedUser: {
      id: "u3",
      name: "Emily Okonkwo",
      photo: null,
      age: 27,
      country: "Nigeria",
      state: "Abuja",
      occupation: "Medical Doctor",
      about: "Dedicated doctor looking for my life partner. Family-oriented and love to travel.",
      hobbies: "Travel, Cooking, Reading",
      religion: "Christianity",
      lookingFor: "marriage",
    },
  },
  {
    id: "m3",
    score: 78,
    factors: { age: 80, location: 85, goal: 90, religion: 70, interests: 65, relocation: 75 },
    matchedUser: {
      id: "u4",
      name: "Amara Okafor",
      photo: null,
      age: 30,
      country: "Nigeria",
      state: "Lagos",
      occupation: "Lawyer",
      about: "Ambitious lawyer with a soft heart. Looking for someone who shares my values.",
      hobbies: "Reading, Tennis, Volunteering",
      religion: "Christianity",
      lookingFor: "relationship",
    },
  },
];

export const mockBookings = [
  {
    id: "b1",
    preferredDate: "2026-07-15",
    preferredTime: "10:00",
    status: "CONFIRMED",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    notes: "Excited for our session!",
    createdAt: "2026-06-10T08:00:00.000Z",
  },
  {
    id: "b2",
    preferredDate: "2026-06-28",
    preferredTime: "14:00",
    status: "PENDING",
    meetingLink: null,
    notes: null,
    createdAt: "2026-06-18T12:00:00.000Z",
  },
];

export const mockNotifications = [
  { id: "n1", message: "Your profile has been viewed by Sarah Johnson", read: false, type: "INFO", link: null, createdAt: "2026-06-19T10:00:00.000Z" },
  { id: "n2", message: "New match found! Check your matches page", read: false, type: "MATCH", link: "/matches", createdAt: "2026-06-18T15:00:00.000Z" },
  { id: "n3", message: "Your booking for Jun 15 is confirmed", read: true, type: "BOOKING", link: "/bookings", createdAt: "2026-06-17T09:00:00.000Z" },
];

export const mockAdminStats = {
  stats: { totalUsers: 156, premiumUsers: 42, totalMatches: 890, pendingBookings: 7 },
};

export const mockAdminUsers = [
  { id: "u1", name: "John Doe", email: "john@example.com", role: "USER", membership: "PREMIUM", createdAt: "2026-01-15T08:00:00.000Z" },
  { id: "u2", name: "Sarah Johnson", email: "sarah@example.com", role: "USER", membership: "FREE", createdAt: "2026-02-20T10:00:00.000Z" },
  { id: "u3", name: "Emily Okonkwo", email: "emily@example.com", role: "USER", membership: "PREMIUM", createdAt: "2026-03-10T12:00:00.000Z" },
  { id: "u4", name: "Admin User", email: "admin@happyconnect.com", role: "ADMIN", membership: "PREMIUM", createdAt: "2026-01-01T00:00:00.000Z" },
];

export const mockPayments = [
  { id: "p1", userId: "u1", user: { name: "John Doe", email: "john@example.com" }, amount: 25000, plan: "PREMIUM", status: "APPROVED", reference: "PAY-001", createdAt: "2026-04-01T08:00:00.000Z" },
  { id: "p2", userId: "u3", user: { name: "Emily Okonkwo", email: "emily@example.com" }, amount: 25000, plan: "PREMIUM", status: "PENDING", reference: "PAY-002", createdAt: "2026-06-15T10:00:00.000Z" },
];

export const mockContentBlocks = [
  { id: "c1", page: "home", key: "hero-title", content: "Find Your Perfect Match" },
  { id: "c2", page: "home", key: "hero-subtitle", content: "Connecting serious singles for meaningful relationships" },
  { id: "c3", page: "about", key: "mission", content: "To help serious singles find lasting love." },
];
