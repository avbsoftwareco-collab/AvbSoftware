"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "918103558368";
const WHATSAPP_MESSAGE =
  "Hello AVB Software! I'd like to discuss a project with you.";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-[#FAF5EA] rounded-2xl shadow-2xl p-5 w-64 border border-[#E8DEC8]"
            style={{
              boxShadow: "0 20px 60px rgba(139, 111, 71, 0.25)"
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p 
                  className="font-bold text-[#2B2419] text-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  AVB Software
                </p>
                <p className="text-[#6B5D4A] text-xs mt-0.5">
                  ✨ Typically replies instantly
                </p>
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-gradient-to-r from-[#8B6F47] to-[#6B5535] hover:from-[#6B5535] hover:to-[#8B6F47] text-white text-sm font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <MessageCircle className="w-4 h-4" />
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center shadow-lg transition-all relative"
        style={{
          boxShadow: "0 8px 30px rgba(139, 111, 71, 0.4)"
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#C9A45C] opacity-30 animate-ping"></span>
        
        <AnimatePresence mode="wait">
          {showTooltip ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}