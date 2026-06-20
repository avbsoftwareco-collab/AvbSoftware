// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { 
//   LogOut, 
//   Plus, 
//   Globe, 
//   Users, 
//   TrendingUp, 
//   Edit, 
//   ExternalLink,
//   Search,
//   Eye,
//   Trash2,
//   RefreshCw,
//   Calendar
// } from "lucide-react";
// import { getAllClients, deleteClient, Client } from "@/lib/supabase";

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [clients, setClients] = useState<Client[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState<"all" | "live" | "draft">("all");

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("avb_admin_logged_in");
//     if (loggedIn !== "true") {
//       router.push("/admin");
//     } else {
//       setIsLoggedIn(true);
//       loadClients();
//     }
//   }, [router]);

//   const loadClients = async () => {
//     setLoading(true);
//     const data = await getAllClients();
//     setClients(data);
//     setLoading(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("avb_admin_logged_in");
//     localStorage.removeItem("avb_admin_email");
//     localStorage.removeItem("avb_admin_login_time");
//     router.push("/admin");
//   };

//   const handleDelete = async (id: string, name: string) => {
//     if (!confirm(`Delete ${name}? This cannot be undone!`)) return;
    
//     const success = await deleteClient(id);
//     if (success) {
//       alert("✅ Client deleted successfully!");
//       loadClients();
//     } else {
//       alert("❌ Failed to delete client!");
//     }
//   };

//   const filteredClients = clients.filter((c) => {
//     const matchesSearch = c.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           c.subdomain?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = filterStatus === "all" || c.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   if (!isLoggedIn) return null;

//   return (
//     <div className="min-h-screen bg-[#F5F0E6]">
//       {/* Header */}
//       <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl flex items-center justify-center">
//               <span className="text-white font-bold">A</span>
//             </div>
//             <div>
//               <h1 
//                 className="text-xl font-bold text-[#2B2419]"
//                 style={{ fontFamily: "'Playfair Display', serif" }}
//               >
//                 AVB Admin Dashboard
//               </h1>
//               <p className="text-xs text-[#8B6F47]">Manage Client Websites</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={loadClients}
//               className="flex items-center gap-2 px-4 py-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] text-[#8B6F47] rounded-xl transition-all text-sm font-semibold"
//               title="Refresh"
//             >
//               <RefreshCw className="w-4 h-4" />
//               Refresh
//             </button>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all text-sm font-semibold"
//             >
//               <LogOut className="w-4 h-4" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           {[
//             { 
//               icon: Globe, 
//               label: "Total Websites", 
//               value: clients.length, 
//               color: "from-[#8B6F47] to-[#6B5535]",
//               bgColor: "bg-[#FAF5EA]"
//             },
//             { 
//               icon: TrendingUp, 
//               label: "Live Sites", 
//               value: clients.filter(c => c.status === "live").length, 
//               color: "from-green-500 to-green-600",
//               bgColor: "bg-green-50"
//             },
//             { 
//               icon: Edit, 
//               label: "Drafts", 
//               value: clients.filter(c => c.status === "draft").length, 
//               color: "from-yellow-500 to-yellow-600",
//               bgColor: "bg-yellow-50"
//             },
//             { 
//               icon: Users, 
//               label: "Monthly Income", 
//               value: `₹${(clients.filter(c => c.status === "live").length * 799).toLocaleString()}`, 
//               color: "from-blue-500 to-blue-600",
//               bgColor: "bg-blue-50"
//             },
//           ].map((stat, i) => (
//             <div key={i} className={`${stat.bgColor} rounded-2xl p-5 border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all`}>
//               <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
//                 <stat.icon className="w-6 h-6 text-white" />
//               </div>
//               <div className="text-3xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
//                 {stat.value}
//               </div>
//               <div className="text-xs text-[#6B5D4A] font-medium mt-1">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Action Bar */}
//         <div className="bg-white rounded-2xl p-4 mb-6 border border-[#E8DEC8] shadow-sm">
//           <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
//               <input
//                 type="text"
//                 placeholder="Search by business name or subdomain..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] transition-all"
//               />
//             </div>

//             {/* Filter */}
//             <div className="flex gap-2">
//               {["all", "live", "draft"].map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => setFilterStatus(status as any)}
//                   className={`px-4 py-3 rounded-xl text-sm font-semibold capitalize transition-all ${
//                     filterStatus === status
//                       ? "bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white shadow-md"
//                       : "bg-[#FAF5EA] text-[#8B6F47] border border-[#E8DEC8] hover:border-[#D4C29E]"
//                   }`}
//                 >
//                   {status}
//                 </button>
//               ))}
//             </div>
            
//             {/* New Client Button */}
//             <Link
//               href="/admin/new-website"
//               className="px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 whitespace-nowrap"
//             >
//               <Plus className="w-5 h-5" />
//               New Website
//             </Link>
//           </div>
//         </div>

//         {/* Clients List */}
//         {loading ? (
//           <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
//             <div className="text-6xl mb-4 animate-spin">⏳</div>
//             <p className="text-[#8B6F47] font-bold">Loading clients...</p>
//           </div>
//         ) : filteredClients.length === 0 ? (
//           <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
//             <div className="text-6xl mb-4">🌐</div>
//             <h3 
//               className="text-2xl font-bold text-[#2B2419] mb-2"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               {searchQuery ? "No clients found" : "No websites yet"}
//             </h3>
//             <p className="text-[#6B5D4A] mb-6">
//               {searchQuery ? "Try a different search" : "Create your first client website!"}
//             </p>
//             {!searchQuery && (
//               <Link
//                 href="/admin/new-website"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl"
//               >
//                 <Plus className="w-5 h-5" />
//                 Create First Website
//               </Link>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredClients.map((client) => (
//               <div
//                 key={client.id}
//                 className="bg-white rounded-2xl p-5 border border-[#E8DEC8] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
//               >
//                 {/* Status Badge */}
//                 <div className="flex items-center justify-between mb-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     client.status === 'live' 
//                       ? 'bg-green-100 text-green-700 border border-green-300' 
//                       : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
//                   }`}>
//                     {client.status === 'live' ? '🟢 LIVE' : '🟡 DRAFT'}
//                   </span>
//                   <span className="text-xs text-[#8B7E6A]">
//                     {client.template}
//                   </span>
//                 </div>

//                 {/* Business Name */}
//                 <h3 
//                   className="text-xl font-bold text-[#2B2419] mb-2 group-hover:text-[#8B6F47] transition-colors"
//                   style={{ fontFamily: "'Playfair Display', serif" }}
//                 >
//                   {client.business_name}
//                 </h3>

//                 {/* Info */}
//                 <div className="space-y-1.5 mb-4 text-sm">
//                   <div className="flex items-center gap-2 text-[#6B5D4A]">
//                     <Globe className="w-4 h-4 text-[#8B6F47]" />
//                     <code className="bg-[#FAF5EA] px-2 py-0.5 rounded text-xs">
//                       {client.subdomain}
//                     </code>
//                   </div>
//                   <div className="flex items-center gap-2 text-[#6B5D4A] text-xs">
//                     <Calendar className="w-3 h-3" />
//                     {new Date(client.created_at || '').toLocaleDateString()}
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="flex gap-2 mb-4 text-xs">
//                   <div className="bg-[#FAF5EA] px-2 py-1 rounded">
//                     <span className="text-[#8B6F47] font-bold">{client.products?.length || 0}</span>
//                     <span className="text-[#6B5D4A] ml-1">products</span>
//                   </div>
//                   <div className="bg-[#FAF5EA] px-2 py-1 rounded">
//                     <span className="text-[#8B6F47] font-bold">{client.reviews?.length || 0}</span>
//                     <span className="text-[#6B5D4A] ml-1">reviews</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2 pt-4 border-t border-[#E8DEC8]">
//                   <Link
//                     href={`/site/${client.subdomain}`}
//                     target="_blank"
//                     className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] text-[#8B6F47] rounded-lg transition-colors text-xs font-semibold"
//                     title="Preview"
//                   >
//                     <Eye className="w-3 h-3" />
//                     Preview
//                   </Link>
//                   <Link
//                     href={`/admin/edit/${client.id}`}
//                     className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-xs font-semibold"
//                     title="Edit"
//                   >
//                     <Edit className="w-3 h-3" />
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(client.id!, client.business_name)}
//                     className="flex items-center justify-center gap-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-xs font-semibold"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LogOut, Plus, Users, TrendingUp, Edit, Eye, Trash2, RefreshCw,
  Search, DollarSign, AlertCircle, BarChart3, CreditCard
} from "lucide-react";
import { getAllClients, deleteClient, getDashboardStats, Client } from "@/lib/supabase";

interface Stats {
  totalClients: number;
  activeClients: number;
  monthRevenue: number;
  pendingAmount: number;
  newClientsThisMonth: number;
  starterClients: number;
  professionalClients: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    activeClients: 0,
    monthRevenue: 0,
    pendingAmount: 0,
    newClientsThisMonth: 0,
    starterClients: 0,
    professionalClients: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState<"all" | "starter" | "professional">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "draft">("all");

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
    const [clientsData, statsData] = await Promise.all([
      getAllClients(),
      getDashboardStats(),
    ]);
    setClients(clientsData);
    setStats(statsData);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("avb_admin_logged_in");
    router.push("/admin");
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    const success = await deleteClient(id);
    if (success) {
      alert("✅ Deleted!");
      loadData();
    }
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.subdomain?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === "all" || c.plan_type === filterPlan;
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
                AVB Admin Dashboard
              </h1>
              <p className="text-xs text-[#8B6F47]">Manage Your Business</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/payments" className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-semibold">
              <CreditCard className="w-4 h-4" /> Payments
            </Link>
            <Link href="/admin/reports" className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-sm font-semibold">
              <BarChart3 className="w-4 h-4" /> Reports
            </Link>
            <button onClick={loadData} className="flex items-center gap-2 px-4 py-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] text-[#8B6F47] rounded-xl text-sm font-semibold">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3 shadow-md">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-700" style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{stats.monthRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-green-600 font-medium mt-1">This Month Revenue</div>
          </div>

          <div className="bg-gradient-to-br from-[#FAF5EA] to-[#E8DCC4] rounded-2xl p-5 border border-[#D4C29E]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl flex items-center justify-center mb-3 shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {stats.totalClients}
            </div>
            <div className="text-xs text-[#6B5D4A] font-medium mt-1">Total Clients</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-md">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-yellow-700" style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{stats.pendingAmount.toLocaleString()}
            </div>
            <div className="text-xs text-yellow-600 font-medium mt-1">Pending Payments</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-700" style={{ fontFamily: "'Playfair Display', serif" }}>
              +{stats.newClientsThisMonth}
            </div>
            <div className="text-xs text-blue-600 font-medium mt-1">New This Month</div>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#2B2419]">🌟 Starter Plan</h3>
              <span className="text-2xl font-bold text-[#8B6F47]">{stats.starterClients}</span>
            </div>
            <div className="text-sm text-[#6B5D4A]">₹799 × {stats.starterClients} = ₹{(stats.starterClients * 799).toLocaleString()}/mo</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#2B2419]">👑 Professional Plan</h3>
              <span className="text-2xl font-bold text-[#C9A45C]">{stats.professionalClients}</span>
            </div>
            <div className="text-sm text-[#6B5D4A]">₹2,499 × {stats.professionalClients} = ₹{(stats.professionalClients * 2499).toLocaleString()}/mo</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-[#E8DEC8] shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
              />
            </div>

            <div className="flex gap-2">
              <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value as any)} className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm">
                <option value="all">All Plans</option>
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
              </select>

              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm">
                <option value="all">All Status</option>
                <option value="live">Live</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            <Link href="/admin/new-website" className="px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-lg flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-5 h-5" /> New Client
            </Link>
          </div>
        </div>

        {/* Clients List */}
        {loading ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-[#8B6F47] font-bold">Loading...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4">🌐</div>
            <h3 className="text-2xl font-bold text-[#2B2419] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No clients found
            </h3>
            <Link href="/admin/new-website" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl mt-4">
              <Plus className="w-5 h-5" /> Add First Client
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAF5EA] border-b border-[#E8DEC8]">
                  <tr>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Business</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Plan</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Status</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Payment</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Next Due</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="border-b border-[#E8DEC8] hover:bg-[#FAF5EA] transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#2B2419]">{client.business_name}</div>
                        <div className="text-xs text-[#8B6F47]">
                          {client.custom_domain || `${client.subdomain}.avbsoftware.com`}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          client.plan_type === 'professional' ? 'bg-[#C9A45C] text-white' : 'bg-[#8B6F47] text-white'
                        }`}>
                          {client.plan_type === 'professional' ? '👑 Pro' : '🌟 Starter'}
                        </span>
                        <div className="text-xs text-[#6B5D4A] mt-1">₹{client.plan_price}/mo</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          client.status === "live" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {client.status === "live" ? "🟢 LIVE" : "🟡 Draft"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          client.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                          client.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {client.payment_status === 'paid' ? '✅ Paid' : 
                           client.payment_status === 'pending' ? '⏰ Pending' : '❌ Overdue'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-[#6B5D4A]">
                        {client.next_payment_date 
                          ? new Date(client.next_payment_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                          : '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/site/${client.subdomain}`} target="_blank" className="p-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] rounded-lg" title="Preview">
                            <Eye className="w-4 h-4 text-[#8B6F47]" />
                          </Link>
                          <Link href={`/admin/edit/${client.id}`} className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg" title="Edit">
                            <Edit className="w-4 h-4 text-blue-700" />
                          </Link>
                          <button onClick={() => handleDelete(client.id!, client.business_name)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg" title="Delete">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}