"use client";

import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ⭐ HIDE AVB NAVBAR/FOOTER ON ADMIN PAGES ⭐ */}
      <style jsx global>{`
        body > header,
        body > nav,
        body > footer,
        body > div.fixed.bottom-6.right-6 {
          display: none !important;
        }
        body {
          padding-top: 0 !important;
        }
      `}</style>

      <div className="min-h-screen bg-[#F5F0E6]">
        {children}
      </div>
    </>
  );
}