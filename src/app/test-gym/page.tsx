"use client";

import GymHomePage from "@/app/components/sites/gym/HomePage";

export default function TestGymPage() {
  const dummyClient = {
    id: "test",
    business_name: "PULSE",
    tagline: "Elevate Beyond Limits",
    about: "Premium fitness destination where transformations happen.",
    about_short: "Where champions are forged through dedication and uncompromising standards.",
    phone: "+919876543210",
    year_established: "2018",
    
    // 🎨 5 THEMES - Try each!
    gym_theme: "cyan_dream",  // Purple + Gold + Pink (Premium luxe)
    // gym_theme: "emerald_lux",  // Green + Gold + Cyan (Fresh premium)
    // gym_theme: "rose_premium", // Rose + Gold + Orange (Bold elegant)
    // gym_theme: "cyan_dream",   // Cyan + Yellow + Purple (Futuristic)
    // gym_theme: "sunset_gold",  // Orange + Yellow + Red (Warm power)
    
    reviews: [
      { name: "RAJ MEHTA", role: "Lost 25kg · 8 months", text: "Game changer. The trainers, energy, results - everything is at next level. Best decision ever." },
      { name: "PRIYA SHARMA", role: "Pro Athlete", text: "Trained at gyms across the world. This place stands apart. World-class facility, premium experience." },
      { name: "VIKRAM SINGH", role: "Bodybuilder · 5 Yrs", text: "From day one, the experience has been phenomenal. Equipment, trainers, community - all elite." },
    ],
  } as any;

  return <GymHomePage client={dummyClient} />;
}