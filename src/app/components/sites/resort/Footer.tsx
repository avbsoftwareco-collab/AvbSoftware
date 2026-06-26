"use client";

import { Client } from "@/lib/supabase";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

export default function Footer({ client, setPage }: Props) {
  return (
    <footer
      style={{
        background: "var(--theme-bg-2)",
        borderTop: "1px solid var(--theme-border)",
        padding: "80px 60px 30px",
      }}
    >
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <div
            className="font-bold mb-3"
            style={{
              fontFamily: "'Italiana', serif",
              fontSize: "32px",
              color: "var(--theme-primary)",
              letterSpacing: "4px",
            }}
          >
            {client.business_name?.toUpperCase()}
          </div>
          <div
            className="italic mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--theme-text-muted)",
              fontSize: "16px",
            }}
          >
            {client.tagline || "A Luxury Escape"}
          </div>
          <p style={{ color: "var(--theme-text-muted)", fontSize: "13px", lineHeight: 2 }}>
            {client.address && <>📍 {client.address}<br/></>}
            {client.phone && <>📞 {client.phone}<br/></>}
            {client.email && <>✉️ {client.email}</>}
          </p>
        </div>

        <div>
          <h5
            className="uppercase mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--theme-primary)",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            Explore
          </h5>
          {["Rooms", "Experiences", "Gallery", "About"].map((l, i) => {
            const pages = ["rooms", "amenities", "gallery", "about"];
            return (
              <button
                key={i}
                onClick={() => setPage(pages[i])}
                className="block text-left mb-2"
                style={{ color: "var(--theme-text-muted)", fontSize: "13px" }}
              >
                {l}
              </button>
            );
          })}
        </div>

        <div>
          <h5
            className="uppercase mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--theme-primary)",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            Visit
          </h5>
          <button
            onClick={() => setPage("contact")}
            className="block text-left mb-2"
            style={{ color: "var(--theme-text-muted)", fontSize: "13px" }}
          >
            Contact Us
          </button>
          <button
            onClick={() => setPage("contact")}
            className="block text-left mb-2"
            style={{ color: "var(--theme-text-muted)", fontSize: "13px" }}
          >
            Book Now
          </button>
        </div>

        <div>
          <h5
            className="uppercase mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--theme-primary)",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            Follow
          </h5>
          {client.instagram && (
            <a href={client.instagram} target="_blank" rel="noopener" className="block mb-2"
              style={{ color: "var(--theme-text-muted)", fontSize: "13px" }}>
              Instagram
            </a>
          )}
          {client.facebook && (
            <a href={client.facebook} target="_blank" rel="noopener" className="block mb-2"
              style={{ color: "var(--theme-text-muted)", fontSize: "13px" }}>
              Facebook
            </a>
          )}
        </div>
      </div>

      <div
        className="max-w-[1300px] mx-auto pt-8 text-center uppercase"
        style={{
          borderTop: "1px solid var(--theme-border)",
          fontSize: "10px",
          letterSpacing: "3px",
          color: "var(--theme-text-muted)",
        }}
      >
        © {new Date().getFullYear()} {client.business_name} · All Rights Reserved
      </div>
    </footer>
  );
}