"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";

// ⚠️ CHANGE THIS PASSWORD!
const ADMIN_EMAIL = "nandu@gmail.com";
const ADMIN_PASSWORD = "nandu@123"; // ⚠️ CHANGE THIS!

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("avb_admin_logged_in", "true");
        localStorage.setItem("avb_admin_email", email);
        localStorage.setItem("avb_admin_login_time", new Date().toISOString());
        router.push("/admin/dashboard");
      } else {
        setError("Invalid email or password!");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#2B2419] p-4">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#C9A45C]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#E8DCC4]/10 rounded-full blur-3xl"></div>

      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-[#D4C29E]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 
            className="text-3xl font-bold text-[#2B2419] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Admin <span className="italic gradient-text">Login</span>
          </h1>
          <p className="text-[#6B5D4A] text-sm">
            AVB Software Admin Panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#2B2419] mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@avbsoftware.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] transition-all text-[#2B2419]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#2B2419] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-12 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] transition-all text-[#2B2419]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B6F47] hover:text-[#2B2419] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <span>❌</span>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Login to Dashboard
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Default Credentials Info */}
        <div className="mt-6 p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
          <p className="text-xs text-[#6B5D4A] font-semibold mb-2">🔑 Default Credentials:</p>
          <p className="text-xs text-[#8B6F47]">Email: {ADMIN_EMAIL}</p>
          <p className="text-xs text-[#8B6F47]">Password: {ADMIN_PASSWORD}</p>
          <p className="text-[10px] text-[#8B7E6A] mt-2 italic">
            ⚠️ Change in src/app/admin/page.tsx
          </p>
        </div>
      </div>
    </div>
  );
}