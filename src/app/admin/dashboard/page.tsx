





// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { 
//   LogOut, Plus, Users, TrendingUp, Edit, Eye, Trash2, RefreshCw,
//   Search, DollarSign, AlertCircle, BarChart3, CreditCard
// } from "lucide-react";
// import { getAllClients, deleteClient, getDashboardStats, Client } from "@/lib/supabase";

// interface Stats {
//   totalClients: number;
//   activeClients: number;
//   monthRevenue: number;
//   pendingAmount: number;
//   newClientsThisMonth: number;
//   starterClients: number;
//   professionalClients: number;
// }

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [clients, setClients] = useState<Client[]>([]);
//   const [stats, setStats] = useState<Stats>({
//     totalClients: 0,
//     activeClients: 0,
//     monthRevenue: 0,
//     pendingAmount: 0,
//     newClientsThisMonth: 0,
//     starterClients: 0,
//     professionalClients: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPlan, setFilterPlan] = useState<"all" | "starter" | "professional">("all");
//   const [filterStatus, setFilterStatus] = useState<"all" | "live" | "draft">("all");

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("avb_admin_logged_in");
//     if (loggedIn !== "true") {
//       router.push("/admin");
//     } else {
//       setIsLoggedIn(true);
//       loadData();
//     }
//   }, [router]);

//   const loadData = async () => {
//     setLoading(true);
//     const [clientsData, statsData] = await Promise.all([
//       getAllClients(),
//       getDashboardStats(),
//     ]);
//     setClients(clientsData);
//     setStats(statsData);
//     setLoading(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("avb_admin_logged_in");
//     router.push("/admin");
//   };

//   const handleDelete = async (id: string, name: string) => {
//     if (!confirm(`Delete ${name}?`)) return;
//     const success = await deleteClient(id);
//     if (success) {
//       alert("✅ Deleted!");
//       loadData();
//     }
//   };

//   const filteredClients = clients.filter((c) => {
//     const matchesSearch = c.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           c.subdomain?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesPlan = filterPlan === "all" || c.plan_type === filterPlan;
//     const matchesStatus = filterStatus === "all" || c.status === filterStatus;
//     return matchesSearch && matchesPlan && matchesStatus;
//   });

//   if (!isLoggedIn) return null;

//   return (
//     <div className="min-h-screen bg-[#F5F0E6]">
//       <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl flex items-center justify-center">
//               <span className="text-white font-bold">A</span>
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
//                 AVB Admin Dashboard
//               </h1>
//               <p className="text-xs text-[#8B6F47]">Manage Your Business</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link href="/admin/payments" className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-semibold">
//               <CreditCard className="w-4 h-4" /> Payments
//             </Link>
//             <Link href="/admin/reports" className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-sm font-semibold">
//               <BarChart3 className="w-4 h-4" /> Reports
//             </Link>
//             <button onClick={loadData} className="flex items-center gap-2 px-4 py-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] text-[#8B6F47] rounded-xl text-sm font-semibold">
//               <RefreshCw className="w-4 h-4" /> Refresh
//             </button>
//             <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold">
//               <LogOut className="w-4 h-4" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
//             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3 shadow-md">
//               <DollarSign className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-3xl font-bold text-green-700" style={{ fontFamily: "'Playfair Display', serif" }}>
//               ₹{stats.monthRevenue.toLocaleString()}
//             </div>
//             <div className="text-xs text-green-600 font-medium mt-1">This Month Revenue</div>
//           </div>

//           <div className="bg-gradient-to-br from-[#FAF5EA] to-[#E8DCC4] rounded-2xl p-5 border border-[#D4C29E]">
//             <div className="w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl flex items-center justify-center mb-3 shadow-md">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-3xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
//               {stats.totalClients}
//             </div>
//             <div className="text-xs text-[#6B5D4A] font-medium mt-1">Total Clients</div>
//           </div>

//           <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200">
//             <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-md">
//               <AlertCircle className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-3xl font-bold text-yellow-700" style={{ fontFamily: "'Playfair Display', serif" }}>
//               ₹{stats.pendingAmount.toLocaleString()}
//             </div>
//             <div className="text-xs text-yellow-600 font-medium mt-1">Pending Payments</div>
//           </div>

//           <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-200">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 shadow-md">
//               <TrendingUp className="w-6 h-6 text-white" />
//             </div>
//             <div className="text-3xl font-bold text-blue-700" style={{ fontFamily: "'Playfair Display', serif" }}>
//               +{stats.newClientsThisMonth}
//             </div>
//             <div className="text-xs text-blue-600 font-medium mt-1">New This Month</div>
//           </div>
//         </div>

//         {/* Plan Distribution */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//           <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8]">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-bold text-[#2B2419]">🌟 Starter Plan</h3>
//               <span className="text-2xl font-bold text-[#8B6F47]">{stats.starterClients}</span>
//             </div>
//             <div className="text-sm text-[#6B5D4A]">₹799 × {stats.starterClients} = ₹{(stats.starterClients * 799).toLocaleString()}/mo</div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8]">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-bold text-[#2B2419]">👑 Professional Plan</h3>
//               <span className="text-2xl font-bold text-[#C9A45C]">{stats.professionalClients}</span>
//             </div>
//             <div className="text-sm text-[#6B5D4A]">₹2,499 × {stats.professionalClients} = ₹{(stats.professionalClients * 2499).toLocaleString()}/mo</div>
//           </div>
//         </div>

//         {/* Action Bar */}
//         <div className="bg-white rounded-2xl p-4 mb-6 border border-[#E8DEC8] shadow-sm">
//           <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
//               <input
//                 type="text"
//                 placeholder="Search clients..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
//               />
//             </div>

//             <div className="flex gap-2">
//               <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value as any)} className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm">
//                 <option value="all">All Plans</option>
//                 <option value="starter">Starter</option>
//                 <option value="professional">Professional</option>
//               </select>

//               <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm">
//                 <option value="all">All Status</option>
//                 <option value="live">Live</option>
//                 <option value="draft">Draft</option>
//               </select>
//             </div>
            
//             <Link href="/admin/new-website" className="px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-lg flex items-center gap-2 whitespace-nowrap">
//               <Plus className="w-5 h-5" /> New Client
//             </Link>
//           </div>
//         </div>

//         {/* Clients List */}
//         {loading ? (
//           <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
//             <div className="text-6xl mb-4 animate-spin">⏳</div>
//             <p className="text-[#8B6F47] font-bold">Loading...</p>
//           </div>
//         ) : filteredClients.length === 0 ? (
//           <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
//             <div className="text-6xl mb-4">🌐</div>
//             <h3 className="text-2xl font-bold text-[#2B2419] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
//               No clients found
//             </h3>
//             <Link href="/admin/new-website" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl mt-4">
//               <Plus className="w-5 h-5" /> Add First Client
//             </Link>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-[#FAF5EA] border-b border-[#E8DEC8]">
//                   <tr>
//                     <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Business</th>
//                     <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Plan</th>
//                     <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Status</th>
//                     <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Payment</th>
//                     <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Next Due</th>
//                     <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredClients.map((client) => (
//                     <tr key={client.id} className="border-b border-[#E8DEC8] hover:bg-[#FAF5EA] transition-colors">
//                       <td className="p-4">
//                         <div className="font-bold text-[#2B2419]">{client.business_name}</div>
//                         <div className="text-xs text-[#8B6F47]">
//                           {client.custom_domain || `${client.subdomain}.avbsoftware.com`}
//                         </div>
//                       </td>
//                       <td className="p-4">
//                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                           client.plan_type === 'professional' ? 'bg-[#C9A45C] text-white' : 'bg-[#8B6F47] text-white'
//                         }`}>
//                           {client.plan_type === 'professional' ? '👑 Pro' : '🌟 Starter'}
//                         </span>
//                         <div className="text-xs text-[#6B5D4A] mt-1">₹{client.plan_price}/mo</div>
//                       </td>
//                       <td className="p-4">
//                         <span className={`px-3 py-1 text-xs font-bold rounded-full ${
//                           client.status === "live" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
//                         }`}>
//                           {client.status === "live" ? "🟢 LIVE" : "🟡 Draft"}
//                         </span>
//                       </td>
//                       <td className="p-4">
//                         <span className={`px-3 py-1 text-xs font-bold rounded-full ${
//                           client.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
//                           client.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//                         }`}>
//                           {client.payment_status === 'paid' ? '✅ Paid' : 
//                            client.payment_status === 'pending' ? '⏰ Pending' : '❌ Overdue'}
//                         </span>
//                       </td>
//                       <td className="p-4 text-sm text-[#6B5D4A]">
//                         {client.next_payment_date 
//                           ? new Date(client.next_payment_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
//                           : '-'}
//                       </td>
//                       <td className="p-4">
//                         <div className="flex items-center gap-2">
//                           <Link href={`/site/${client.subdomain}`} target="_blank" className="p-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] rounded-lg" title="Preview">
//                             <Eye className="w-4 h-4 text-[#8B6F47]" />
//                           </Link>
//                           <Link href={`/admin/edit/${client.id}`} className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg" title="Edit">
//                             <Edit className="w-4 h-4 text-blue-700" />
//                           </Link>
//                           <button onClick={() => handleDelete(client.id!, client.business_name)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg" title="Delete">
//                             <Trash2 className="w-4 h-4 text-red-600" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
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
  Search, DollarSign, AlertCircle, BarChart3, CreditCard, 
  LayoutGrid, List, Crown, Sparkles
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

// Template icons mapping
const TEMPLATE_INFO: Record<string, { icon: string; color: string; bg: string }> = {
  restaurant: { icon: "🍽", color: "text-purple-700", bg: "bg-purple-100" },
  timber: { icon: "🪵", color: "text-amber-700", bg: "bg-amber-100" },
  cake: { icon: "🎂", color: "text-pink-700", bg: "bg-pink-100" },
  default: { icon: "🌐", color: "text-gray-700", bg: "bg-gray-100" },
};

const getTemplateInfo = (template: string = "") => {
  const t = template.toLowerCase();
  if (t.includes("restaurant")) return TEMPLATE_INFO.restaurant;
  if (t.includes("timber")) return TEMPLATE_INFO.timber;
  if (t.includes("cake")) return TEMPLATE_INFO.cake;
  return TEMPLATE_INFO.default;
};

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
  const [filterTemplate, setFilterTemplate] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

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

  // Get unique templates
  const uniqueTemplates = Array.from(new Set(clients.map(c => c.template).filter(Boolean)));

  // Template-wise count
  const templateCounts = clients.reduce((acc, c) => {
    const t = c.template || "Unknown";
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.subdomain?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === "all" || c.plan_type === filterPlan;
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    const matchesTemplate = filterTemplate === "all" || c.template === filterTemplate;
    return matchesSearch && matchesPlan && matchesStatus && matchesTemplate;
  });

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* ════════════════════════════════════════ */}
      {/* HEADER                                   */}
      {/* ════════════════════════════════════════ */}
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
        
        {/* ════════════════════════════════════════ */}
        {/* MAIN STATS                               */}
        {/* ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
            <div className="text-xs text-[#6B5D4A] font-medium mt-1">Total Websites</div>
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

        {/* ════════════════════════════════════════ */}
        {/* TEMPLATES BREAKDOWN - NEW SECTION!       */}
        {/* ════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-[#E8DEC8] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
                🎨 Templates Used
              </h2>
              <p className="text-xs text-[#6B5D4A] mt-0.5">Click on any template to filter</p>
            </div>
            <button 
              onClick={() => setFilterTemplate("all")} 
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                filterTemplate === "all" 
                  ? "bg-[#8B6F47] text-white" 
                  : "bg-[#FAF5EA] text-[#8B6F47] hover:bg-[#E8DCC4]"
              }`}
            >
              Show All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(templateCounts).map(([template, count]) => {
              const info = getTemplateInfo(template);
              const isActive = filterTemplate === template;
              return (
                <button
                  key={template}
                  onClick={() => setFilterTemplate(isActive ? "all" : template)}
                  className={`p-4 rounded-xl border-2 transition-all hover:-translate-y-1 hover:shadow-md ${
                    isActive 
                      ? "border-[#8B6F47] bg-[#FAF5EA] shadow-md ring-2 ring-[#8B6F47]" 
                      : "border-[#E8DEC8] bg-white hover:border-[#D4C29E]"
                  }`}
                >
                  <div className="text-3xl mb-2">{info.icon}</div>
                  <div className="text-sm font-bold text-[#2B2419] truncate">
                    {template}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-2xl font-bold ${info.color}`}>{count}</span>
                    <span className="text-xs text-[#8B6F47] font-medium">
                      {count === 1 ? "site" : "sites"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════ */}
        {/* PLAN DISTRIBUTION                        */}
        {/* ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

        {/* ════════════════════════════════════════ */}
        {/* SEARCH + FILTERS + VIEW TOGGLE           */}
        {/* ════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-[#E8DEC8] shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
              <input
                type="text"
                placeholder="Search by business name or subdomain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <select 
                value={filterTemplate} 
                onChange={(e) => setFilterTemplate(e.target.value)} 
                className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm cursor-pointer"
              >
                <option value="all">All Templates</option>
                {uniqueTemplates.map(t => (
                  <option key={t} value={t}>{getTemplateInfo(t).icon} {t}</option>
                ))}
              </select>

              <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value as any)} className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm cursor-pointer">
                <option value="all">All Plans</option>
                <option value="starter">🌟 Starter</option>
                <option value="professional">👑 Professional</option>
              </select>

              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm cursor-pointer">
                <option value="all">All Status</option>
                <option value="live">🟢 Live</option>
                <option value="draft">🟡 Draft</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl p-1">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "cards" 
                      ? "bg-[#8B6F47] text-white" 
                      : "text-[#8B6F47] hover:bg-[#E8DCC4]"
                  }`}
                  title="Card View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "table" 
                      ? "bg-[#8B6F47] text-white" 
                      : "text-[#8B6F47] hover:bg-[#E8DCC4]"
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <Link href="/admin/new-website" className="px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-lg flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-5 h-5" /> New Website
            </Link>
          </div>

          {/* Active Filters Display */}
          {(filterTemplate !== "all" || filterPlan !== "all" || filterStatus !== "all" || searchQuery) && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E8DEC8] flex-wrap">
              <span className="text-xs text-[#6B5D4A] font-medium">Active filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
                  Search: {searchQuery}
                </span>
              )}
              {filterTemplate !== "all" && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md font-medium">
                  Template: {filterTemplate}
                </span>
              )}
              {filterPlan !== "all" && (
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-md font-medium">
                  Plan: {filterPlan}
                </span>
              )}
              {filterStatus !== "all" && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium">
                  Status: {filterStatus}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterTemplate("all");
                  setFilterPlan("all");
                  setFilterStatus("all");
                }}
                className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md font-medium hover:bg-red-200"
              >
                ✕ Clear All
              </button>
              <span className="ml-auto text-xs text-[#8B6F47] font-bold">
                Showing {filteredClients.length} of {clients.length} websites
              </span>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════ */}
        {/* CLIENTS LIST                             */}
        {/* ════════════════════════════════════════ */}
        {loading ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-[#8B6F47] font-bold">Loading...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4">🌐</div>
            <h3 className="text-2xl font-bold text-[#2B2419] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No websites found
            </h3>
            <p className="text-[#6B5D4A] mb-4">
              {searchQuery || filterTemplate !== "all" || filterPlan !== "all" || filterStatus !== "all"
                ? "Try adjusting your filters"
                : "Get started by creating your first website"}
            </p>
            <Link href="/admin/new-website" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl mt-4">
              <Plus className="w-5 h-5" /> Add First Website
            </Link>
          </div>
        ) : viewMode === "cards" ? (
          // ═══════════════════════════════════════
          // CARD VIEW - Visual & Beautiful
          // ═══════════════════════════════════════
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => {
              const info = getTemplateInfo(client.template);
              return (
                <div
                  key={client.id}
                  className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Top Banner */}
                  <div className="relative h-32 overflow-hidden">
                    {client.hero_image_url || client.hero_image ? (
                      <img 
                        src={client.hero_image_url || client.hero_image || ""} 
                        alt={client.business_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full ${info.bg} flex items-center justify-center`}>
                        <span className="text-6xl">{info.icon}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full backdrop-blur-md ${
                        client.status === "live" 
                          ? "bg-green-500/90 text-white" 
                          : "bg-yellow-500/90 text-white"
                      }`}>
                        {client.status === "live" ? "🟢 LIVE" : "🟡 DRAFT"}
                      </span>
                    </div>

                    {/* Template Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${info.bg} ${info.color} backdrop-blur-md`}>
                        {info.icon} {client.template}
                      </span>
                    </div>

                    {/* Logo Overlay */}
                    {client.logo_url && (
                      <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
                        <img src={client.logo_url} alt={client.business_name} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-[#2B2419] text-lg mb-1 truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {client.business_name}
                    </h3>
                    <p className="text-xs text-[#8B6F47] mb-3 truncate">
                      {client.custom_domain || `${client.subdomain}.avbsoftware.com`}
                    </p>

                    {/* Info Row */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                        client.plan_type === 'professional' 
                          ? 'bg-gradient-to-r from-[#C9A45C] to-[#B8923D] text-white' 
                          : 'bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white'
                      }`}>
                        {client.plan_type === 'professional' ? '👑 Pro' : '🌟 Starter'}
                      </span>
                      <span className="text-xs text-[#6B5D4A] font-semibold">
                        ₹{client.plan_price}/mo
                      </span>
                      <span className={`ml-auto px-2 py-1 text-[10px] font-bold rounded-md ${
                        client.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                        client.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {client.payment_status === 'paid' ? '✅' : 
                         client.payment_status === 'pending' ? '⏰' : '❌'}
                      </span>
                    </div>

                    {/* Next Due Date */}
                    {client.next_payment_date && (
                      <div className="text-xs text-[#6B5D4A] mb-3 flex items-center gap-1">
                        <span>📅 Next due:</span>
                        <span className="font-semibold">
                          {new Date(client.next_payment_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                   {/* Actions */}
<div className="flex flex-col gap-2 pt-3 border-t border-[#E8DEC8]">
  {/* Top Row - Preview, Edit, Delete */}
  <div className="flex items-center gap-2">
    <Link 
      href={`/site/${client.subdomain}`} 
      target="_blank" 
      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] rounded-lg text-xs font-semibold text-[#8B6F47] transition-colors"
    >
      <Eye className="w-3.5 h-3.5" /> Preview
    </Link>
    <Link 
      href={`/admin/edit/${client.id}`} 
      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-xs font-semibold text-blue-700 transition-colors"
    >
      <Edit className="w-3.5 h-3.5" /> Edit
    </Link>
    <button 
      onClick={() => handleDelete(client.id!, client.business_name)} 
      className="px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors" 
      title="Delete"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  </div>

  {/* Bottom Row - Blog Button */}
  {client.plan_type === 'professional' ? (
    // Professional - Blog button VISIBLE
    <Link
      href={`/admin/blog/${client.id}`}
      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-xs font-bold text-white transition-all hover:shadow-md"
    >
      <span>📝</span> Manage Blog Posts
    </Link>
  ) : (
    // Starter - Blog button LOCKED
    <div className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-xs font-semibold text-gray-400 cursor-not-allowed border border-dashed border-gray-300">
      <span>🔒</span> Blog — Upgrade to Pro
    </div>
  )}
</div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // ═══════════════════════════════════════
          // TABLE VIEW - Compact & Detailed
          // ═══════════════════════════════════════
          <div className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAF5EA] border-b border-[#E8DEC8]">
                  <tr>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Business</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Template</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Plan</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Status</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Payment</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Next Due</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => {
                    const info = getTemplateInfo(client.template);
                    return (
                      <tr key={client.id} className="border-b border-[#E8DEC8] hover:bg-[#FAF5EA] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {client.logo_url ? (
                              <img src={client.logo_url} alt={client.business_name} className="w-10 h-10 rounded-full object-cover border border-[#E8DEC8]" />
                            ) : (
                              <div className={`w-10 h-10 rounded-full ${info.bg} flex items-center justify-center text-lg`}>
                                {info.icon}
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-[#2B2419]">{client.business_name}</div>
                              <div className="text-xs text-[#8B6F47]">
                                {client.custom_domain || `${client.subdomain}.avbsoftware.com`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${info.bg} ${info.color}`}>
                            {info.icon} {client.template}
                          </span>
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
    <Link 
      href={`/site/${client.subdomain}`} 
      target="_blank" 
      className="p-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] rounded-lg" 
      title="Preview"
    >
      <Eye className="w-4 h-4 text-[#8B6F47]" />
    </Link>
    <Link 
      href={`/admin/edit/${client.id}`} 
      className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg" 
      title="Edit"
    >
      <Edit className="w-4 h-4 text-blue-700" />
    </Link>

    {/* Blog Button - Plan based */}
    {client.plan_type === 'professional' ? (
      <Link
        href={`/admin/blog/${client.id}`}
        className="p-2 bg-purple-50 hover:bg-purple-100 rounded-lg"
        title="Manage Blog"
      >
        <span className="text-sm">📝</span>
      </Link>
    ) : (
      <div
        className="p-2 bg-gray-100 rounded-lg cursor-not-allowed"
        title="Blog — Pro plan only"
      >
        <span className="text-sm opacity-40">📝</span>
      </div>
    )}

    <button 
      onClick={() => handleDelete(client.id!, client.business_name)} 
      className="p-2 bg-red-50 hover:bg-red-100 rounded-lg" 
      title="Delete"
    >
      <Trash2 className="w-4 h-4 text-red-600" />
    </button>
  </div>
</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}