"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LogOut, 
  Plus, 
  Globe, 
  Users, 
  TrendingUp, 
  Edit, 
  ExternalLink,
  Search,
  Eye,
  Trash2,
  RefreshCw,
  Calendar
} from "lucide-react";
import { getAllClients, deleteClient, Client } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "draft">("all");

  useEffect(() => {
    const loggedIn = localStorage.getItem("avb_admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);
      loadClients();
    }
  }, [router]);

  const loadClients = async () => {
    setLoading(true);
    const data = await getAllClients();
    setClients(data);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("avb_admin_logged_in");
    localStorage.removeItem("avb_admin_email");
    localStorage.removeItem("avb_admin_login_time");
    router.push("/admin");
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This cannot be undone!`)) return;
    
    const success = await deleteClient(id);
    if (success) {
      alert("✅ Client deleted successfully!");
      loadClients();
    } else {
      alert("❌ Failed to delete client!");
    }
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.subdomain?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h1 
                className="text-xl font-bold text-[#2B2419]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                AVB Admin Dashboard
              </h1>
              <p className="text-xs text-[#8B6F47]">Manage Client Websites</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadClients}
              className="flex items-center gap-2 px-4 py-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] text-[#8B6F47] rounded-xl transition-all text-sm font-semibold"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              icon: Globe, 
              label: "Total Websites", 
              value: clients.length, 
              color: "from-[#8B6F47] to-[#6B5535]",
              bgColor: "bg-[#FAF5EA]"
            },
            { 
              icon: TrendingUp, 
              label: "Live Sites", 
              value: clients.filter(c => c.status === "live").length, 
              color: "from-green-500 to-green-600",
              bgColor: "bg-green-50"
            },
            { 
              icon: Edit, 
              label: "Drafts", 
              value: clients.filter(c => c.status === "draft").length, 
              color: "from-yellow-500 to-yellow-600",
              bgColor: "bg-yellow-50"
            },
            { 
              icon: Users, 
              label: "Monthly Income", 
              value: `₹${(clients.filter(c => c.status === "live").length * 799).toLocaleString()}`, 
              color: "from-blue-500 to-blue-600",
              bgColor: "bg-blue-50"
            },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bgColor} rounded-2xl p-5 border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#6B5D4A] font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-[#E8DEC8] shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
              <input
                type="text"
                placeholder="Search by business name or subdomain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] transition-all"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              {["all", "live", "draft"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold capitalize transition-all ${
                    filterStatus === status
                      ? "bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white shadow-md"
                      : "bg-[#FAF5EA] text-[#8B6F47] border border-[#E8DEC8] hover:border-[#D4C29E]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            
            {/* New Client Button */}
            <Link
              href="/admin/new-website"
              className="px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              New Website
            </Link>
          </div>
        </div>

        {/* Clients List */}
        {loading ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-[#8B6F47] font-bold">Loading clients...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4">🌐</div>
            <h3 
              className="text-2xl font-bold text-[#2B2419] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {searchQuery ? "No clients found" : "No websites yet"}
            </h3>
            <p className="text-[#6B5D4A] mb-6">
              {searchQuery ? "Try a different search" : "Create your first client website!"}
            </p>
            {!searchQuery && (
              <Link
                href="/admin/new-website"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl"
              >
                <Plus className="w-5 h-5" />
                Create First Website
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl p-5 border border-[#E8DEC8] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    client.status === 'live' 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  }`}>
                    {client.status === 'live' ? '🟢 LIVE' : '🟡 DRAFT'}
                  </span>
                  <span className="text-xs text-[#8B7E6A]">
                    {client.template}
                  </span>
                </div>

                {/* Business Name */}
                <h3 
                  className="text-xl font-bold text-[#2B2419] mb-2 group-hover:text-[#8B6F47] transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {client.business_name}
                </h3>

                {/* Info */}
                <div className="space-y-1.5 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-[#6B5D4A]">
                    <Globe className="w-4 h-4 text-[#8B6F47]" />
                    <code className="bg-[#FAF5EA] px-2 py-0.5 rounded text-xs">
                      {client.subdomain}
                    </code>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B5D4A] text-xs">
                    <Calendar className="w-3 h-3" />
                    {new Date(client.created_at || '').toLocaleDateString()}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-2 mb-4 text-xs">
                  <div className="bg-[#FAF5EA] px-2 py-1 rounded">
                    <span className="text-[#8B6F47] font-bold">{client.products?.length || 0}</span>
                    <span className="text-[#6B5D4A] ml-1">products</span>
                  </div>
                  <div className="bg-[#FAF5EA] px-2 py-1 rounded">
                    <span className="text-[#8B6F47] font-bold">{client.reviews?.length || 0}</span>
                    <span className="text-[#6B5D4A] ml-1">reviews</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-[#E8DEC8]">
                  <Link
                    href={`/site/${client.subdomain}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] text-[#8B6F47] rounded-lg transition-colors text-xs font-semibold"
                    title="Preview"
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </Link>
                  <Link
                    href={`/admin/edit/${client.id}`}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-xs font-semibold"
                    title="Edit"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(client.id!, client.business_name)}
                    className="flex items-center justify-center gap-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-xs font-semibold"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}