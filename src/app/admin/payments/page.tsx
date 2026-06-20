"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Search, DollarSign, TrendingUp, AlertCircle, Calendar, Trash2 } from "lucide-react";
import { getAllPayments, deletePayment, Payment } from "@/lib/supabase";

export default function PaymentsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending">("all");

  useEffect(() => {
    const loggedIn = localStorage.getItem("avb_admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);
      loadPayments();
    }
  }, [router]);

  const loadPayments = async () => {
    setLoading(true);
    const data = await getAllPayments();
    setPayments(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this payment record?")) return;
    const success = await deletePayment(id);
    if (success) {
      alert("✅ Deleted!");
      loadPayments();
    }
  };

  const filteredPayments = payments.filter((p) => {
    const businessName = p.clients?.business_name?.toLowerCase() || '';
    const matchesSearch = businessName.includes(searchQuery.toLowerCase());
    const matchesMonth = filterMonth === "all" || p.month === filterMonth;
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesMonth && matchesStatus;
  });

  const totalRevenue = filteredPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingRevenue = filteredPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalCount = filteredPayments.length;

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5535] font-semibold">
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
            💰 Payments Management
          </h1>
          <div></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-700" style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-green-600 font-medium mt-1">Total Received</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-yellow-700" style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{pendingRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-yellow-600 font-medium mt-1">Pending</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-700" style={{ fontFamily: "'Playfair Display', serif" }}>
              {totalCount}
            </div>
            <div className="text-xs text-blue-600 font-medium mt-1">Total Transactions</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-[#E8DEC8] shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
              <input
                type="text"
                placeholder="Search client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
              />
            </div>

            <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm">
              <option value="all">All Months</option>
              <option value="Jan">January</option>
              <option value="Feb">February</option>
              <option value="Mar">March</option>
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
              <option value="Jul">July</option>
              <option value="Aug">August</option>
              <option value="Sep">September</option>
              <option value="Oct">October</option>
              <option value="Nov">November</option>
              <option value="Dec">December</option>
            </select>

            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl font-semibold text-sm">
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        {loading ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-[#8B6F47] font-bold">Loading...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-[#E8DEC8]">
            <div className="text-6xl mb-4">💰</div>
            <p className="text-[#8B6F47] font-bold">No payments found</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAF5EA] border-b border-[#E8DEC8]">
                  <tr>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Date</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Client</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Amount</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Method</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Month</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Status</th>
                    <th className="text-left p-4 text-xs font-bold text-[#8B6F47] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#E8DEC8] hover:bg-[#FAF5EA]">
                      <td className="p-4 text-sm text-[#6B5D4A]">
                        {new Date(payment.payment_date || '').toLocaleDateString('en-IN')}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-[#2B2419]">{payment.clients?.business_name || 'Unknown'}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-green-700">₹{payment.amount.toLocaleString()}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase">
                          {payment.payment_method}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-[#6B5D4A]">
                        {payment.month} {payment.year}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          payment.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {payment.status === 'paid' ? '✅ Paid' : '⏰ Pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => handleDelete(payment.id!)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
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