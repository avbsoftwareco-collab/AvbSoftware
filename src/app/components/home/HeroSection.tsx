

// "use client";

// import Link from "next/link";
// import { useEffect, useState, useRef } from "react";

// const techStack = [
//   { name: "Next.js", emoji: "⚡" },
//   { name: "React.js", emoji: "⚛️" },
//   { name: "React Native", emoji: "📱" },
//   { name: "Flutter", emoji: "🦋" },
//   { name: "Node.js", emoji: "🟢" },
//   { name: "TypeScript", emoji: "🔷" },
//   { name: "JavaScript", emoji: "🟨" },
//   { name: "Python", emoji: "🐍" },
//   { name: "MongoDB", emoji: "🍃" },
//   { name: "PostgreSQL", emoji: "🐘" },
//   { name: "Firebase", emoji: "🔥" },
//   { name: "AWS", emoji: "☁️" },
//   { name: "Figma", emoji: "🎨" },
//   { name: "Tailwind CSS", emoji: "💨" },
//   { name: "WordPress", emoji: "📝" },
// ];

// export default function HeroSection() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [displayText, setDisplayText] = useState("");
//   const [wordIndex, setWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [typingSpeed, setTypingSpeed] = useState(150);
  
//   const headlines = [
//     "Grows Your Business",
//     "Delivers Results",
//     "Scales With You",
//     "Wins Trust",
//   ];

//   // Typewriter effect
//   useEffect(() => {
//     const currentWord = headlines[wordIndex];
    
//     const timeout = setTimeout(() => {
//       if (!isDeleting) {
//         // Typing
//         if (displayText.length < currentWord.length) {
//           setDisplayText(currentWord.slice(0, displayText.length + 1));
//           setTypingSpeed(120);
//         } else {
//           // Word complete - pause before deleting
//           setTypingSpeed(2000);
//           setIsDeleting(true);
//         }
//       } else {
//         // Deleting
//         if (displayText.length > 0) {
//           setDisplayText(currentWord.slice(0, displayText.length - 1));
//           setTypingSpeed(80);
//         } else {
//           // Move to next word
//           setIsDeleting(false);
//           setWordIndex((prev) => (prev + 1) % headlines.length);
//           setTypingSpeed(150);
//         }
//       }
//     }, typingSpeed);
    
//     return () => clearTimeout(timeout);
//   }, [displayText, isDeleting, wordIndex, headlines, typingSpeed]);

//   // Mouse move effect for custom glow
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20 lg:pt-24">
      
//       {/* Custom cursor glow */}
//       <div
//         className="pointer-events-none fixed inset-0 z-30 transition-transform duration-300 ease-out"
//         style={{
//           background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 80%)`,
//         }}
//       />

//       {/* Animated background blobs */}
//       <div className="absolute top-20 -left-48 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
//       <div className="absolute top-40 -right-48 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
//       <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

//       {/* Main content */}
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
//         <div className="max-w-4xl mx-auto text-center">
          
//           {/* Animated badge */}
//           <div className="mb-6 animate-slide-down">
//             <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm text-indigo-600 text-sm font-semibold rounded-full border border-indigo-200 shadow-lg shadow-indigo-100/50 hover:shadow-indigo-200/50 transition-all duration-300">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//               </span>
//               ✨ Available for new projects
//             </span>
//           </div>

//           {/* Main headline with typewriter effect */}
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
//             We Build Software That{" "}
//             <span className="relative inline-block min-w-[240px]">
//               <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 blur-2xl opacity-30"></span>
//               <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black">
//                 {displayText}
//                 <span className="animate-blink inline-block w-[3px] h-[0.8em] bg-indigo-500 ml-1 align-middle"></span>
//               </span>
//             </span>
//             <span className="inline-block ml-2 animate-wave">👋</span>
//           </h1>

//           {/* Subheadline with gradient underline */}
//           <div className="relative inline-block mb-8">
//             <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
//               AVB Software — Web, Mobile & Custom IT Solutions
//             </p>
//             <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"></div>
//           </div>

//           {/* Trust indicators */}
//           <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-700 mb-10">
//             {["On-Time Delivery", "Transparent Pricing", "24/7 Support"].map((item) => (
//               <span key={item} className="flex items-center gap-2 group cursor-default">
//                 <span className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full group-hover:scale-110 transition-transform">
//                   <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </span>
//                 <span className="font-medium group-hover:text-indigo-600 transition-colors">{item}</span>
//               </span>
//             ))}
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
//             <Link
//               href="/contact"
//               className="group relative px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 Get Free Consultation
//                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//             </Link>
            
//             <Link
//               href="/portfolio"
//               className="group px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 shadow-md hover:shadow-lg hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1"
//             >
//               <span className="flex items-center gap-2">
//                 See Our Work
//                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Skills Marquee (unchanged) */}
//       <div className="relative z-10 pb-8 mt-12">
//         <p className="text-center text-xs text-slate-500 font-medium tracking-widest uppercase mb-4">
//           🛠️ Technologies We Master
//         </p>
//         <div className="marquee">
//           <div className="marquee-content">
//             {techStack.map((tech) => (
//               <span key={`a-${tech.name}`} className="skill-pill">
//                 <span>{tech.emoji}</span>
//                 {tech.name}
//               </span>
//             ))}
//           </div>
//           <div className="marquee-content" aria-hidden="true">
//             {techStack.map((tech) => (
//               <span key={`b-${tech.name}`} className="skill-pill">
//                 <span>{tech.emoji}</span>
//                 {tech.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         @keyframes wave {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(15deg); }
//           75% { transform: rotate(-10deg); }
//         }
//         .animate-wave {
//           animation: wave 1s ease-in-out infinite;
//           display: inline-block;
//         }
//         @keyframes slide-down {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slide-down {
//           animation: slide-down 0.6s ease-out;
//         }
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//         .animate-blink {
//           animation: blink 0.8s step-end infinite;
//         }

//         /* Marquee styles */
//         .marquee {
//           display: flex;
//           overflow: hidden;
//           white-space: nowrap;
//           user-select: none;
//           mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
//         }
//         .marquee-content {
//           display: flex;
//           gap: 1.5rem;
//           animation: marqueeScroll 25s linear infinite;
//           flex-shrink: 0;
//         }
//         .marquee:hover .marquee-content {
//           animation-play-state: paused;
//         }
//         @keyframes marqueeScroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//         .skill-pill {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.5rem 1.25rem;
//           background: white;
//           border-radius: 9999px;
//           font-size: 0.875rem;
//           font-weight: 500;
//           color: #1e293b;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.05);
//           border: 1px solid #e2e8f0;
//           transition: all 0.2s ease;
//         }
//         .skill-pill:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//           border-color: #cbd5e1;
//         }
//       `}</style>
//     </section>
//   );
// }






"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const techStack = [
  { name: "Next.js", emoji: "⚡" },
  { name: "React.js", emoji: "⚛️" },
  { name: "React Native", emoji: "📱" },
  { name: "Flutter", emoji: "🦋" },
  { name: "Node.js", emoji: "🟢" },
  { name: "TypeScript", emoji: "🔷" },
  { name: "JavaScript", emoji: "🟨" },
  { name: "Python", emoji: "🐍" },
  { name: "MongoDB", emoji: "🍃" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "Firebase", emoji: "🔥" },
  { name: "AWS", emoji: "☁️" },
  { name: "Figma", emoji: "🎨" },
  { name: "Tailwind CSS", emoji: "💨" },
  { name: "WordPress", emoji: "📝" },
];

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const headlines = [
    "Grows Your Business",
    "Delivers Results",
    "Scales With You",
    "Wins Trust",
  ];

  // Typewriter effect
  useEffect(() => {
    const currentWord = headlines[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          setTypingSpeed(120);
        } else {
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
          setTypingSpeed(80);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % headlines.length);
          setTypingSpeed(150);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, headlines, typingSpeed]);

  // Mouse move effect for custom glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20 lg:pt-24">
      
      {/* Custom cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 80%)`,
        }}
      />

      {/* Animated background blobs */}
      <div className="absolute top-20 -left-48 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-40 -right-48 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge — simple fade-in (slow) */}
          <div className="mb-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm text-indigo-600 text-sm font-semibold rounded-full border border-indigo-200 shadow-lg shadow-indigo-100/50 hover:shadow-indigo-200/50 transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              ✨ Available for new projects
            </span>
          </div>

          {/* Main headline with slower slide animations */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            {/* Left to right - slower */}
            <span className="inline-block animate-slide-left-right">
              We Build Software That{" "}
            </span>
            {/* Right to left - slower */}
            <span className="relative inline-block min-w-[240px] animate-slide-right-left">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 blur-2xl opacity-30"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black">
                {displayText}
                <span className="animate-blink inline-block w-[3px] h-[0.8em] bg-indigo-500 ml-1 align-middle"></span>
              </span>
            </span>
            <span className="inline-block ml-2 animate-wave">👋</span>
          </h1>

          {/* Subheadline with slower fade-up */}
          <div className="relative inline-block mb-8 animate-fade-in-up">
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              AVB Software — Web, Mobile & Custom IT Solutions
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"></div>
          </div>

          {/* Trust indicators with slower fade-up + delay */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-700 mb-10 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            {["On-Time Delivery", "Transparent Pricing", "24/7 Support"].map((item) => (
              <span key={item} className="flex items-center gap-2 group cursor-default">
                <span className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full group-hover:scale-110 transition-transform">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="font-medium group-hover:text-indigo-600 transition-colors">{item}</span>
              </span>
            ))}
          </div>

          {/* CTA Buttons with slower fade-up + delay */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Free Consultation
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link
              href="/portfolio"
              className="group px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 shadow-md hover:shadow-lg hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                See Our Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Skills Marquee (unchanged) */}
      <div className="relative z-10 pb-8 mt-12">
        <p className="text-center text-xs text-slate-500 font-medium tracking-widest uppercase mb-4">
          🛠️ Technologies We Master
        </p>
        <div className="marquee">
          <div className="marquee-content">
            {techStack.map((tech) => (
              <span key={`a-${tech.name}`} className="skill-pill">
                <span>{tech.emoji}</span>
                {tech.name}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {techStack.map((tech) => (
              <span key={`b-${tech.name}`} className="skill-pill">
                <span>{tech.emoji}</span>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-10deg); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
          display: inline-block;
        }
        
        /* Slower entrance animations */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        
        @keyframes slide-left-right {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-left-right {
          animation: slide-left-right 1.2s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        
        @keyframes slide-right-left {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-right-left {
          animation: slide-right-left 1.2s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }

        /* Marquee styles (unchanged) */
        .marquee {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          user-select: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-content {
          display: flex;
          gap: 1.5rem;
          animation: marqueeScroll 25s linear infinite;
          flex-shrink: 0;
        }
        .marquee:hover .marquee-content {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .skill-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: white;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1e293b;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }
        .skill-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-color: #cbd5e1;
        }
      `}</style>
    </section>
  );
}