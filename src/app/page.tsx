// import type { Metadata } from "next";
// import HeroSection from "./components/home/HeroSection";
// import TrustBar from "./components/home/TrustBar";
// import ServicesOverview from "./components/home/ServicesOverview";
// import WhyChooseUs from "./components/home/WhyChooseUs";
// import StatsSection from "./components/home/StatsSection";
// import TestimonialsSection from "./components/home/TestimonialsSection";
// import CTABanner from "./components/home/CTABanner";

// export const metadata: Metadata = {
//   title: "AVB Software — Web & App Development Company in Bhopal",
//   description:
//     "AVB Software is a Bhopal-based IT company offering web development, mobile apps, and custom software solutions at affordable prices.",
// };

// export default function HomePage() {
//   return (
//     <>
//       <HeroSection />
//       <TrustBar />
//       <ServicesOverview />
//       <WhyChooseUs />
//       <StatsSection />
//       <TestimonialsSection />
//       <CTABanner />
//     </>
//   );
// }


import type { Metadata } from "next";
import HeroSection from "./components/home/HeroSection";
import TrustBar from "./components/home/TrustBar";
import ServicesOverview from "./components/home/ServicesOverview";
import WhyChooseUs from "./components/home/WhyChooseUs";
import StatsSection from "./components/home/StatsSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import CTABanner from "./components/home/CTABanner";

export const metadata: Metadata = {
  title: "AVB Software — Web & App Development Company in Bhopal",
  description: "AVB Software is a Bhopal-based IT company offering web development, mobile apps, and custom software solutions.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <ServicesOverview />
      <WhyChooseUs />
      <StatsSection />
      <TestimonialsSection />
      <CTABanner />
    </main>
  );
}