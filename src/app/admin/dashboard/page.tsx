"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Users,
  TrendingUp,
  DollarSign,
  Globe,
  Calendar,
  Loader,
  LogOut,
  Crown,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import {
  getAllClients,
  getDashboardStats,
  deleteClient,
  logoutAdmin,
  Client,
} from "@/lib/supabase";

// ═══════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════
interface DashboardStats {
  total: number;
  live: number;
  draft: number;
  professional: number;
  starter: number;
  totalRevenue: number;
  monthRevenue: number;
  yearRevenue: number;
  paid: number;
  pending: number;
  overdue: number;
  templates: Record<string, number>;
  recentClients: Client[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "draft">(
    "all"
  );
  const [filterTemplate, setFilterTemplate] = useState<string>("all");

  // ✅ FIXED: Default stats with all properties
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    live: 0,
    draft: 0,
    professional: 0,
    starter: 0,
    totalRevenue: 0,
    monthRevenue: 0,
    yearRevenue: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
    templates: {},
    recentClients: [],
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("avb_admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);
      loadData();
    }
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [clientsData, statsData] = await Promise.all([
        getAllClients(),
        getDashboardStats(),
      ]);
      setClients(clientsData || []);

      // ✅ Safe merge with default values
      setStats({
        total: statsData.total || 0,
        live: statsData.live || 0,
        draft: statsData.draft || 0,
        professional: statsData.professional || 0,
        starter: statsData.starter || 0,
        totalRevenue: statsData.totalRevenue || 0,
        monthRevenue: statsData.monthRevenue || 0,
        yearRevenue: statsData.yearRevenue || 0,
        paid: statsData.paid || 0,
        pending: statsData.pending || 0,
        overdue: statsData.overdue || 0,
        templates: statsData.templates || {},
        recentClients: statsData.recentClients || [],
      });
    } catch (err) {
      console.error("❌ Load data error:", err);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    const success = await deleteClient(id);
    if (success) {
      alert("✅ Deleted!");
      loadData();
    } else {
      alert("❌ Failed to delete");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin");
  };

  // ✅ Safe date formatter
  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  // ✅ Safe number formatter
  const formatNumber = (num?: number): string => {
    return (num || 0).toLocaleString("en-IN");
  };

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.business_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      client.subdomain?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || client.status === filterStatus;

    const matchesTemplate =
      filterTemplate === "all" || client.template === filterTemplate;

    return matchesSearch && matchesStatus && matchesTemplate;
  });

  // Get unique templates
  const uniqueTemplates = Array.from(
    new Set(clients.map((c) => c.template).filter(Boolean))
  );

  if (!isLoggedIn || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
        <div className="text-center">
          <Loader className="w-16 h-16 mx-auto mb-4 animate-spin text-[#8B6F47]" />
          <p className="text-xl text-[#8B6F47] font-bold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-bold text-[#2B2419]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              📊 Admin Dashboard
            </h1>
            <p className="text-sm text-[#6B5D4A]">
              Manage all client websites
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/new-website"
              className="px-4 py-2 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" /> New Website
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold text-sm flex items-center gap-1 hover:bg-red-100"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ═══ STATS CARDS ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Total Clients */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-xs text-[#6B5D4A] font-bold">TOTAL</span>
            </div>
            <div
              className="text-3xl font-bold text-[#2B2419]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {stats.total}
            </div>
            <div className="text-xs text-[#6B5D4A] mt-1">Total Websites</div>
          </div>

          {/* Live */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-8 h-8 text-green-500" />
              <span className="text-xs text-green-600 font-bold">LIVE</span>
            </div>
            <div
              className="text-3xl font-bold text-green-700"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {stats.live}
            </div>
            <div className="text-xs text-[#6B5D4A] mt-1">Active Sites</div>
          </div>

          {/* Draft */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Edit className="w-8 h-8 text-yellow-500" />
              <span className="text-xs text-yellow-600 font-bold">DRAFT</span>
            </div>
            <div
              className="text-3xl font-bold text-yellow-700"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {stats.draft}
            </div>
            <div className="text-xs text-[#6B5D4A] mt-1">In Progress</div>
          </div>

          {/* Revenue */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-xs text-green-700 font-bold">/MONTH</span>
            </div>
            <div
              className="text-3xl font-bold text-green-700"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ₹{formatNumber(stats.monthRevenue)}
            </div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              💰 This Month Revenue
            </div>
          </div>
        </div>

        {/* ═══ ADDITIONAL STATS ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Professional */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-2xl border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="text-xs text-yellow-700 font-bold uppercase">
                Professional
              </span>
            </div>
            <div className="text-2xl font-bold text-yellow-700">
              {stats.professional}
            </div>
          </div>

          {/* Starter */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-blue-700 font-bold uppercase">
                Starter
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {stats.starter}
            </div>
          </div>

          {/* Paid */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-2xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-xs text-green-700 font-bold uppercase">
                Paid
              </span>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {stats.paid}
            </div>
          </div>

          {/* Pending Payment */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-2xl border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span className="text-xs text-orange-700 font-bold uppercase">
                Pending
              </span>
            </div>
            <div className="text-2xl font-bold text-orange-700">
              {stats.pending}
            </div>
          </div>
        </div>

        {/* ═══ FILTERS ═══ */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6F47]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, subdomain, or email..."
                className="w-full pl-11 pr-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "all" | "live" | "draft")
              }
              className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] text-sm font-semibold"
            >
              <option value="all">All Status</option>
              <option value="live">🟢 Live</option>
              <option value="draft">🟡 Draft</option>
            </select>

            {/* Template Filter */}
            <select
              value={filterTemplate}
              onChange={(e) => setFilterTemplate(e.target.value)}
              className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] text-sm font-semibold"
            >
              <option value="all">All Templates</option>
              {uniqueTemplates.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Active filters */}
          {(searchQuery || filterStatus !== "all" || filterTemplate !== "all") && (
            <div className="mt-3 flex items-center gap-2 text-xs">
              <Filter className="w-3 h-3 text-[#8B6F47]" />
              <span className="text-[#6B5D4A]">
                Showing <strong>{filteredClients.length}</strong> of{" "}
                <strong>{clients.length}</strong> clients
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                  setFilterTemplate("all");
                }}
                className="text-red-500 font-bold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* ═══ CLIENTS GRID ═══ */}
        {filteredClients.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-[#E8DEC8] text-center">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-2xl font-bold text-[#2B2419] mb-2">
              {clients.length === 0
                ? "No clients yet!"
                : "No matching clients"}
            </h3>
            <p className="text-[#6B5D4A] mb-6">
              {clients.length === 0
                ? "Create your first client website"
                : "Try adjusting filters"}
            </p>
            <Link
              href="/admin/new-website"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white rounded-xl font-bold"
            >
              <Plus className="w-5 h-5" /> Create New Website
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-[#E8DEC8] shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {/* Header with logo */}
                <div className="relative h-32 bg-gradient-to-br from-[#FAF5EA] to-[#E8DCC4] flex items-center justify-center">
                  {client.logo_url ? (
                    <img
                      src={client.logo_url}
                      alt={client.business_name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#8B6F47] text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
                      {client.business_name?.charAt(0) || "?"}
                    </div>
                  )}

                  {/* Status badge */}
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      client.status === "live"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {client.status === "live" ? "🟢 Live" : "🟡 Draft"}
                  </span>

                  {/* Plan badge */}
                  <span
                    className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold ${
                      client.plan_type === "professional"
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-blue-400 text-blue-900"
                    }`}
                  >
                    {client.plan_type === "professional" ? "👑 Pro" : "🌟 Starter"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-lg font-bold text-[#2B2419] mb-1 truncate"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {client.business_name || "Unnamed"}
                  </h3>
                  <p className="text-xs text-[#6B5D4A] mb-3 truncate">
                    {client.tagline || "No tagline"}
                  </p>

                  {/* Info */}
                  <div className="space-y-2 mb-4 text-xs">
                    {client.template && (
                      <div className="flex items-center gap-1">
                        <span className="text-[#8B6F47] font-bold">
                          Template:
                        </span>
                        <span className="text-[#2B2419]">{client.template}</span>
                      </div>
                    )}
                    {client.subdomain && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-[#8B6F47]" />
                        <code className="bg-[#FAF5EA] px-2 py-0.5 rounded text-[10px] truncate">
                          {client.subdomain}.avbsoftware.com
                        </code>
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-1 text-[#6B5D4A]">
                        <span>📞</span>
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {client.city && (
                      <div className="flex items-center gap-1 text-[#6B5D4A]">
                        <span>📍</span>
                        <span>{client.city}</span>
                      </div>
                    )}
                  </div>

                  {/* Payment Info */}
                  <div
                    className={`text-xs mb-3 p-2 rounded-lg ${
                      client.payment_status === "paid"
                        ? "bg-green-50 text-green-700"
                        : client.payment_status === "pending"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        {client.payment_status === "paid"
                          ? "✅ Paid"
                          : client.payment_status === "pending"
                          ? "⏰ Pending"
                          : "❌ Overdue"}
                      </span>
                      <span>₹{formatNumber(client.plan_price)}/mo</span>
                    </div>
                  </div>

                  {/* ✅ FIXED: Safe date display */}
                  {(client as any).next_payment_date && (
                    <div className="text-xs text-[#6B5D4A] mb-3 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Next due:</span>
                      <span className="font-semibold">
                        {formatDate((client as any).next_payment_date)}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      href={`/site/${client.subdomain}`}
                      target="_blank"
                      className="flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all"
                    >
                      <Eye className="w-3 h-3" /> View
                    </Link>
                    <Link
                      href={`/admin/edit/${client.id}`}
                      className="flex items-center justify-center gap-1 py-2 bg-[#8B6F47] text-white rounded-lg text-xs font-bold hover:bg-[#6B5535] transition-all"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(
                          client.id || "",
                          client.business_name || "this"
                        )
                      }
                      className="flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ TEMPLATE BREAKDOWN ═══ */}
        {Object.keys(stats.templates).length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-2xl border border-[#E8DEC8] shadow-md">
            <h3
              className="text-xl font-bold text-[#2B2419] mb-4 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <BarChart3 className="w-5 h-5" /> Template Distribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(stats.templates).map(([template, count]) => (
                <div
                  key={template}
                  className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]"
                >
                  <div className="text-2xl font-bold text-[#8B6F47]">
                    {count}
                  </div>
                  <div className="text-xs text-[#6B5D4A] font-semibold mt-1">
                    {template}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ REVENUE SUMMARY ═══ */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
            <DollarSign className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-xs opacity-80 font-bold uppercase mb-1">
              Total Revenue
            </div>
            <div
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ₹{formatNumber(stats.totalRevenue)}
            </div>
            <div className="text-xs opacity-80 mt-1">All clients combined</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white">
            <Calendar className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-xs opacity-80 font-bold uppercase mb-1">
              Monthly Revenue
            </div>
            <div
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ₹{formatNumber(stats.monthRevenue)}
            </div>
            <div className="text-xs opacity-80 mt-1">Only paid clients</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white">
            <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-xs opacity-80 font-bold uppercase mb-1">
              Yearly Projection
            </div>
            <div
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ₹{formatNumber(stats.yearRevenue)}
            </div>
            <div className="text-xs opacity-80 mt-1">If all stay subscribed</div>
          </div>
        </div>
      </main>
    </div>
  );
}