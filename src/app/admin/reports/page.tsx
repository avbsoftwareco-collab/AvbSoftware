"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";
import { getAllClients, getMonthlyRevenueData, getDashboardStats, Client } from "@/lib/supabase";

export default function ReportsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [monthlyData, setMonthlyData] = useState<Array<{month: string; revenue: number}>>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const loggedIn = localStorage.getItem("avb_admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);
      loadData();
    }
  }, [router, selectedYear]);

  const loadData = async () => {
    setLoading(true);
    const [clientsData, revenueData, statsData] = await Promise.all([
      getAllClients(),
      getMonthlyRevenueData(selectedYear),
      getDashboardStats(),
    ]);
    setClients(clientsData);
    setMonthlyData(revenueData);
    setStats(statsData);
    setLoading(false);
  };

  if (!isLoggedIn) return null;

  const yearlyRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue), 1);

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5535] font-semibold">
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
            📊 Business Reports
          </h1>
          <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="px-4 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold">
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-[#8B6F47] font-bold">Loading...</p>
          </div>
        ) : (
          <>
            {/* Yearly Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-3">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-green-700" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ₹{yearlyRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 font-medium mt-1">Yearly Revenue ({selectedYear})</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-700" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stats?.totalClients || 0}
                </div>
                <div className="text-sm text-blue-600 font-medium mt-1">Total Clients</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-purple-700" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ₹{stats?.totalClients ? Math.round(yearlyRevenue / stats.totalClients).toLocaleString() : 0}
                </div>
                <div className="text-sm text-purple-600 font-medium mt-1">Avg per Client</div>
              </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] mb-8">
              <h2 className="text-2xl font-bold text-[#2B2419] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                📈 Monthly Revenue {selectedYear}
              </h2>

              <div className="space-y-3">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex items-center gap-3">
                    <div className="w-12 text-sm font-bold text-[#6B5D4A]">{data.month}</div>
                    <div className="flex-1 bg-[#FAF5EA] rounded-full h-8 overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8B6F47] to-[#C9A45C] rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ width: `${(data.revenue / maxRevenue) * 100}%`, minWidth: data.revenue > 0 ? '60px' : '0' }}
                      >
                        {data.revenue > 0 && (
                          <span className="text-white text-xs font-bold">₹{data.revenue.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8]">
                <h3 className="text-xl font-bold text-[#2B2419] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  📊 Plan Distribution
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-[#8B6F47]">🌟 Starter (₹799)</span>
                      <span className="text-[#2B2419] font-bold">{stats?.starterClients || 0}</span>
                    </div>
                    <div className="bg-[#FAF5EA] rounded-full h-6 overflow-hidden">
                      <div 
                        className="h-full bg-[#8B6F47] rounded-full transition-all"
                        style={{ width: `${stats?.totalClients ? (stats.starterClients / stats.totalClients) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-[#C9A45C]">👑 Professional (₹2,499)</span>
                      <span className="text-[#2B2419] font-bold">{stats?.professionalClients || 0}</span>
                    </div>
                    <div className="bg-[#FAF5EA] rounded-full h-6 overflow-hidden">
                      <div 
                        className="h-full bg-[#C9A45C] rounded-full transition-all"
                        style={{ width: `${stats?.totalClients ? (stats.professionalClients / stats.totalClients) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8]">
                <h3 className="text-xl font-bold text-[#2B2419] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  💼 Business Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-3 bg-[#FAF5EA] rounded-lg">
                    <span className="text-[#6B5D4A]">Active Clients:</span>
                    <span className="font-bold text-[#2B2419]">{stats?.activeClients || 0}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#FAF5EA] rounded-lg">
                    <span className="text-[#6B5D4A]">Monthly Revenue:</span>
                    <span className="font-bold text-green-700">₹{stats?.monthRevenue?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#FAF5EA] rounded-lg">
                    <span className="text-[#6B5D4A]">Pending Amount:</span>
                    <span className="font-bold text-yellow-700">₹{stats?.pendingAmount?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#FAF5EA] rounded-lg">
                    <span className="text-[#6B5D4A]">New This Month:</span>
                    <span className="font-bold text-blue-700">+{stats?.newClientsThisMonth || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}