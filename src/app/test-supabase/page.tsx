"use client";

import { useEffect, useState } from 'react';
import { getAllClients, Client } from '@/lib/supabase';

export default function TestSupabasePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await getAllClients();
        setClients(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch clients. Check console for details.');
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-xl text-[#8B6F47] font-bold">Loading from Supabase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6] p-8">
        <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-8 max-w-md shadow-xl">
          <div className="text-6xl mb-4 text-center">❌</div>
          <h2 className="text-2xl font-bold text-red-700 mb-2 text-center">Connection Failed!</h2>
          <p className="text-red-600 text-center mb-6">{error}</p>
          
          <div className="bg-white rounded-xl p-4">
            <p className="text-sm font-bold text-gray-700 mb-3">📋 Check These:</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ .env.local file exists in root folder</li>
              <li>✓ NEXT_PUBLIC_SUPABASE_URL is correct</li>
              <li>✓ NEXT_PUBLIC_SUPABASE_ANON_KEY is correct</li>
              <li>✓ No spaces in .env.local file</li>
              <li>✓ Server restarted after .env changes</li>
              <li>✓ Supabase project is healthy</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-3xl p-8 mb-8 border-2 border-green-300 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">✅</div>
            <div>
              <h1 
                className="text-4xl font-bold text-[#2B2419]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Supabase Connected! 🎉
              </h1>
              <p className="text-[#6B5D4A] mt-1">
                Successfully fetched <strong>{clients.length}</strong> clients from database
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-[#FAF5EA] to-[#E8DCC4] p-5 rounded-2xl border border-[#D4C29E]">
              <div className="text-xs text-[#8B6F47] font-bold uppercase tracking-wider">Total Clients</div>
              <div className="text-4xl font-bold text-[#2B2419] mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {clients.length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl border border-green-200">
              <div className="text-xs text-green-700 font-bold uppercase tracking-wider">🟢 Live</div>
              <div className="text-4xl font-bold text-green-700 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {clients.filter(c => c.status === 'live').length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-2xl border border-yellow-200">
              <div className="text-xs text-yellow-700 font-bold uppercase tracking-wider">🟡 Draft</div>
              <div className="text-4xl font-bold text-yellow-700 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {clients.filter(c => c.status === 'draft').length}
              </div>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <h2 
          className="text-2xl font-bold text-[#2B2419] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          📋 All Clients from Database:
        </h2>

        {clients.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-yellow-700 font-bold">No clients found in database</p>
            <p className="text-yellow-600 text-sm mt-2">
              Make sure you ran the SQL with sample data in Supabase
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <h2 
                    className="text-2xl font-bold text-[#2B2419]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {client.business_name}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    client.status === 'live' 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  }`}>
                    {client.status === 'live' ? '🟢 LIVE' : '🟡 DRAFT'}
                  </span>
                </div>

                {/* Info Grid */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex gap-2">
                    <span className="font-bold text-[#8B6F47] min-w-[90px]">Template:</span>
                    <span className="text-[#2B2419]">{client.template}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-[#8B6F47] min-w-[90px]">Subdomain:</span>
                    <code className="bg-[#FAF5EA] px-2 py-0.5 rounded text-[#2B2419] text-xs">
                      {client.subdomain}
                    </code>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-[#8B6F47] min-w-[90px]">Phone:</span>
                    <span className="text-[#2B2419]">{client.phone}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-[#8B6F47] min-w-[90px]">City:</span>
                    <span className="text-[#2B2419]">{client.city}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-[#8B6F47] min-w-[90px]">Tagline:</span>
                    <span className="text-[#2B2419] italic">{client.tagline}</span>
                  </div>
                </div>

                {/* Counts */}
                <div className="flex gap-4 pt-4 border-t border-[#E8DEC8]">
                  <div className="text-xs">
                    <span className="text-[#8B6F47] font-bold">📦 Products: </span>
                    <span className="text-[#2B2419] font-bold">{client.products?.length || 0}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-[#8B6F47] font-bold">⭐ Reviews: </span>
                    <span className="text-[#2B2419] font-bold">{client.reviews?.length || 0}</span>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="flex gap-2 mt-3 items-center">
                  <span className="text-xs text-[#8B6F47] font-bold">🎨 Colors:</span>
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ background: client.primary_color }}
                    title={`Primary: ${client.primary_color}`}
                  />
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ background: client.secondary_color }}
                    title={`Secondary: ${client.secondary_color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Success Footer */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-3xl p-6 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-green-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            🎉 Everything Working Perfectly!
          </h3>
          <p className="text-green-600 mb-4">
            Supabase is connected, database is responding, and data is loading successfully!
          </p>
          <p className="text-sm text-green-700">
            ✅ Ready for next step: Build Admin Panel!
          </p>
        </div>
      </div>
    </div>
  );
}