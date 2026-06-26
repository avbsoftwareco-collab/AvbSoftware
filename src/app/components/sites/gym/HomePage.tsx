// src/app/components/sites/gym/HomePage.tsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useGymTheme } from './useTheme';
import { 
  ArrowRight, 
  Dumbbell, 
  Users, 
  Clock, 
  Star, 
  Play, 
  ChevronRight,
  Award,
  Zap,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface HomePageProps {
  client: any;
  setPage: (page: string, postSlug?: string) => void;
}

export default function HomePage({ client, setPage }: HomePageProps) {
  const theme = useGymTheme(client);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Premium fonts
  const fontStyles = {
    heading: {
      fontFamily: "'Playfair Display', 'Georgia', serif",
    },
    body: {
      fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
    },
  };

  const styles = {
    container: {
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
    },
    heading: {
      color: theme.primary,
      fontFamily: "'Playfair Display', 'Georgia', serif",
    },
    accentText: {
      color: theme.accent,
      fontFamily: "'Playfair Display', 'Georgia', serif",
    },
    buttonPrimary: {
      background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`,
      color: '#000',
      border: 'none',
      padding: '1.2rem 3rem',
      borderRadius: '9999px',
      fontWeight: 700,
      fontSize: '1.1rem',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      boxShadow: `0 8px 40px ${theme.glow}`,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: `2px solid ${theme.accent}`,
      padding: '1.2rem 3rem',
      borderRadius: '9999px',
      fontWeight: 700,
      fontSize: '1.1rem',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    card: {
      backgroundColor: theme.bgCard,
      backdropFilter: 'blur(20px)',
      borderRadius: '2rem',
      padding: '2.5rem',
      border: `1px solid ${theme.border}`,
      boxShadow: `0 30px 80px rgba(0,0,0,0.4)`,
      background: theme.cardGradient,
    },
    glassBadge: {
      backgroundColor: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${theme.accent}40`,
      padding: '0.7rem 2rem',
      borderRadius: '9999px',
      color: theme.accent,
      letterSpacing: '0.2em',
      fontWeight: 600,
      fontSize: '0.85rem',
      textTransform: 'uppercase',
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2 } },
  };
  
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  // High-quality video (Pexels premium gym)
  const videoSrc =
    'https://videos.pexels.com/video-files/4497884/4497884-hd_1920_1080_25fps.mp4';

  // Luxury gym images
  const images = {
    heroFallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80',
    equipment: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
    trainers: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    class1: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    class2: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    class3: 'https://images.unsplash.com/photo-1599058917765-a7803f43d383?w=600&h=400&fit=crop',
    luxury: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
  };

  return (
    <div style={styles.container} className="min-h-screen overflow-x-hidden">
      
      {/* ============ HERO - CINEMATIC VIDEO ============ */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ opacity, scale, y }}
          className="absolute inset-0 z-0"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src={videoSrc}
            poster={images.heroFallback}
            onLoadedData={() => setIsVideoLoaded(true)}
          />
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          {/* Gold accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center max-w-6xl mx-auto px-6"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <span style={styles.glassBadge} className="inline-block">
              ★ PREMIUM FITNESS DESTINATION
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.05] text-white"
            style={fontStyles.heading}
          >
            Elevate Your
            <br />
            <span style={{ color: theme.accent }}>Legacy</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed font-light"
          >
            Where champions are forged through dedication, 
            world-class coaching, and uncompromising standards.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <button
              style={styles.buttonPrimary}
              onClick={() => setPage('pricing')}
              className="hover:scale-105 transition-all flex items-center gap-3 group"
            >
              Join Now
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              style={styles.buttonOutline}
              onClick={() => setPage('programs')}
              className="hover:bg-white/10 transition-all flex items-center gap-3 group"
            >
              <Play size={18} />
              Explore Programs
            </button>
          </motion.div>

          {/* Premium Stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16"
          >
            {[
              { label: 'Active Members', value: '2,500+' },
              { label: 'Expert Coaches', value: '25+' },
              { label: 'Programs', value: '30+' },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/10"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <div className="text-4xl font-bold" style={{ color: theme.accent }}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 font-light tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">
            Scroll
          </span>
          <div className="w-6 h-12 border-2 border-white/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-4 bg-[#FFD700] rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* ============ BRAND LOGO STRIP ============ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="py-12 border-t border-b border-white/5"
        style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.p variants={fadeUp} className="text-center text-white/30 text-sm tracking-[0.3em] uppercase font-light mb-6">
            Trusted by India's Top Athletes
          </motion.p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-50">
            {['ELITE', 'POWER', 'FORGE', 'IRON', 'MAX'].map((brand, i) => (
              <span key={i} className="text-2xl font-bold text-white/40 tracking-wider" style={fontStyles.heading}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ============ WHY US - LUXURY ============ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="py-32 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-20">
          <span style={{ color: theme.accent }} className="text-sm tracking-[0.3em] font-light uppercase">
            Why Choose Us
          </span>
          <h2 style={styles.heading} className="text-5xl md:text-6xl font-bold mt-4">
            The <span style={styles.accentText}>Ultimate</span> Fitness Experience
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Every element designed to elevate your performance and redefine your limits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Award size={48} />,
              title: 'World-Class Equipment',
              desc: 'Premium machines and free weights from top brands for serious training.',
            },
            {
              icon: <Users size={48} />,
              title: 'Elite Coaching Team',
              desc: 'Certified professionals with international experience and proven results.',
            },
            {
              icon: <Zap size={48} />,
              title: 'Cutting-Edge Technology',
              desc: 'Advanced tracking, performance analytics, and smart workout systems.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              style={styles.card}
              className="text-center group hover:scale-105 transition-all duration-500"
            >
              <div className="flex justify-center mb-6" style={{ color: theme.accent }}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: theme.primary }}>
                {item.title}
              </h3>
              <p className="leading-relaxed" style={{ color: theme.textMuted }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ============ PROGRAMS PREVIEW ============ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeUp} className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <div>
            <span style={{ color: theme.accent }} className="text-sm tracking-[0.3em] font-light uppercase">
              Signature Programs
            </span>
            <h2 style={styles.heading} className="text-4xl md:text-5xl font-bold mt-2">
              Elite <span style={styles.accentText}>Classes</span>
            </h2>
          </div>
          <button
            onClick={() => setPage('programs')}
            className="flex items-center gap-2 hover:gap-4 transition-all group"
            style={{ color: theme.accent }}
          >
            <span className="font-semibold">View All Programs</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'CrossFit', image: images.class1, desc: 'High-intensity functional training' },
            { name: 'Boxing', image: images.class2, desc: 'Pro-level boxing & conditioning' },
            { name: 'Yoga', image: images.class3, desc: 'Premium yoga & mindfulness sessions' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
              onClick={() => setPage('programs')}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-[#FFD700]" />
                  <span className="text-3xl font-bold text-white">{item.name}</span>
                </div>
                <p className="text-white/60 text-sm">{item.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:gap-4 transition-all">
                  <span className="text-sm font-light uppercase tracking-wider">Explore</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ============ TESTIMONIAL - PREMIUM ============ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center relative"
      >
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: `radial-gradient(circle, ${theme.accent}, transparent)` }}
        />
        
        <motion.div variants={fadeUp} style={styles.card} className="relative">
          <div className="text-8xl text-[#FFD700] mb-6 leading-none">“</div>
          <p className="text-2xl md:text-3xl font-light leading-relaxed italic" style={{ color: theme.text }}>
            This is not just a gym — it&apos;s a sanctuary of transformation. 
            The coaches, the equipment, the energy — everything is world-class.
          </p>
          <div className="flex items-center justify-center gap-6 mt-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-black"
              style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})` }}
            >
              AS
            </div>
            <div className="text-left">
              <div className="text-xl font-bold" style={{ color: theme.text }}>Arjun Singh</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>Professional Athlete · 3 Years</div>
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} fill="#FFD700" color="#FFD700" />
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ============ CTA - LUXURY ============ */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-32 px-6 md:px-12"
      >
        <div
          className="max-w-6xl mx-auto rounded-4xl p-16 md:p-24 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}EE, ${theme.accent}EE)`,
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          
          <div className="relative z-10">
            <div className="inline-block mb-6 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm text-white/80 text-sm tracking-[0.2em] uppercase font-light">
              Limited Spots Available
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]" style={fontStyles.heading}>
              Ready to Join the <br className="hidden md:block" />
              <span className="underline decoration-4 decoration-[#FFD700]">Elite</span>?
            </h2>
            <p className="text-white/80 text-xl mt-6 max-w-2xl mx-auto font-light">
              Book your free trial session and experience the AVB difference.
            </p>
            <button
              onClick={() => setPage('contact')}
              className="mt-12 px-12 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all shadow-2xl flex items-center gap-4 mx-auto text-lg group"
            >
              <span>Claim Free Trial</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* ============ FOOTER PREVIEW ============ */}
      <footer className="py-16 px-6 border-t border-white/5" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white" style={fontStyles.heading}>
              AVB<span style={{ color: theme.accent }}>.</span>
            </h3>
            <p className="text-white/40 text-sm mt-4 leading-relaxed">
              Premium fitness destination for champions.
            </p>
          </div>
          <div>
            <h4 className="text-white/60 text-sm tracking-[0.2em] uppercase font-light mb-4">Quick Links</h4>
            <ul className="space-y-3 text-white/40">
              <li><button onClick={() => setPage('about')} className="hover:text-white transition">About</button></li>
              <li><button onClick={() => setPage('programs')} className="hover:text-white transition">Programs</button></li>
              <li><button onClick={() => setPage('trainers')} className="hover:text-white transition">Trainers</button></li>
              <li><button onClick={() => setPage('pricing')} className="hover:text-white transition">Pricing</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/60 text-sm tracking-[0.2em] uppercase font-light mb-4">Contact</h4>
            <ul className="space-y-3 text-white/40">
              <li className="flex items-center gap-3"><Phone size={16} /> +91 98765 43210</li>
              <li className="flex items-center gap-3"><Mail size={16} /> info@avbgym.com</li>
              <li className="flex items-center gap-3"><MapPin size={16} /> Mumbai, India</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/60 text-sm tracking-[0.2em] uppercase font-light mb-4">Follow Us</h4>
            <div className="flex gap-4 text-white/40">
              <span className="hover:text-white transition cursor-pointer">IG</span>
              <span className="hover:text-white transition cursor-pointer">YT</span>
              <span className="hover:text-white transition cursor-pointer">FB</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/20 text-sm">
          © 2026 AVB Software. All rights reserved.
        </div>
      </footer>
    </div>
  );
}