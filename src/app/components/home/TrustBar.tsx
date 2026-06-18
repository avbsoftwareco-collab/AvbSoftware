"use client";

import Image from "next/image";

const clients = [
  {
    id: 1,
    name: "Krishna Timber",
    firmType: "Timber & Woodworks",
    location: "Bhopal",
    image: "/clients/Krishan.jpeg",
    workDone: "Payment and Billing System",
  },
  {
    id: 2,
    name: "VRN.INC",
    firmType: "Sales & Marketing",
    location: "Bhopal",
    image: "/clients/finsolve.png",
    workDone: "CRM And Payment Software",
  },
  {
    id: 3,
    name: "MediCare Innovations",
    firmType: "Healthcare",
    location: "Bhopal",
    image: "/clients/",
    workDone: "Doctors Appointment Software",
  },
  {
    id: 4,
    name: "Rcc Infrastructure",
    firmType: "Infrastructure",
    location: "Bhopal",
    image: "/clients/rcc-logo.png",
    workDone: "Purchase Order And Office Expenses Payment Reconciliation",
  },
  // {
  //   id: 5,
  //   name: "DataFlow Analytics",
  //   firmType: "Data Science",
  //   location: "Indore",
  //   image: "/clients/dataflow.png",
  //   workDone: "Analytics Dashboard UI/UX",
  // },
  // {
  //   id: 6,
  //   name: "BuildPro Constructions",
  //   firmType: "Real Estate",
  //   location: "Bhopal",
  //   image: "/clients/buildpro.png",
  //   workDone: "Property Booking Portal",
  // },
  // {
  //   id: 7,
  //   name: "CloudNine Hosting",
  //   firmType: "Cloud Services",
  //   location: "Ujjain",
  //   image: "/clients/cloudnine.png",
  //   workDone: "Hosting Platform Website",
  // },
];

export default function TrustBar() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-[#FAF5EA] to-[#F5F0E6] border-y border-[#D4C29E]/30 relative overflow-hidden"
      aria-labelledby="trust-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#E8DCC4]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

      <div className="container-custom relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
            <span className="w-8 h-px bg-[#8B6F47]"></span>
            TRUSTED PARTNERS
            <span className="w-8 h-px bg-[#8B6F47]"></span>
          </div>
          <h3
            id="trust-heading"
            className="text-3xl md:text-4xl font-bold text-[#2B2419]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trusted by Businesses Across <span className="italic gradient-text">India</span>
          </h3>
          <p className="text-[#6B5D4A] text-base mt-4 max-w-2xl mx-auto">
            Proud to have partnered with amazing businesses in Indore, Bhopal & beyond
          </p>
        </div>

        {/* Scrolling marquee */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="flex animate-marquee-ltr">
            {/* First set */}
            {clients.map((client) => (
              <article
                key={client.id}
                className="mx-4 flex-shrink-0 w-96 bg-white rounded-2xl shadow-md border border-[#E8DEC8] hover:shadow-xl hover:shadow-[#8B6F47]/15 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4C29E] overflow-hidden group"
              >
                <div className="p-6 flex items-start gap-4">
                  {/* Client Logo */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-[#FAF5EA] to-[#E8DCC4] flex-shrink-0 border border-[#E8DEC8] flex items-center justify-center">
                    <Image
                      src={client.image}
                      alt={`${client.name} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Client Info */}
                  <div className="flex-1">
                    <h4 
                      className="font-bold text-[#2B2419] group-hover:text-[#8B6F47] transition-colors text-lg"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {client.name}
                    </h4>
                    <p className="text-xs text-[#6B5D4A] mt-1 font-medium">
                      {client.firmType}
                    </p>
                    <p className="text-xs text-[#8B7E6A] mt-1 flex items-center gap-1">
                      <span aria-hidden="true">📍</span> {client.location}
                    </p>

                    {/* Work Done */}
                    <div className="mt-3 pt-3 border-t border-[#E8DEC8]">
                      <p className="text-[10px] font-semibold text-[#8B6F47] uppercase tracking-wider">
                        ✦ Work Delivered
                      </p>
                      <p className="text-sm text-[#2B2419] mt-1 font-medium">
                        {client.workDone}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Duplicate set for seamless loop */}
            {clients.map((client) => (
              <article
                key={`dup-${client.id}`}
                className="mx-4 flex-shrink-0 w-96 bg-white rounded-2xl shadow-md border border-[#E8DEC8] hover:shadow-xl hover:shadow-[#8B6F47]/15 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4C29E] overflow-hidden group"
                aria-hidden="true"
              >
                <div className="p-6 flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-[#FAF5EA] to-[#E8DCC4] flex-shrink-0 border border-[#E8DEC8] flex items-center justify-center">
                    <Image
                      src={client.image}
                      alt=""
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 
                      className="font-bold text-[#2B2419] group-hover:text-[#8B6F47] transition-colors text-lg"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {client.name}
                    </h4>
                    <p className="text-xs text-[#6B5D4A] mt-1 font-medium">
                      {client.firmType}
                    </p>
                    <p className="text-xs text-[#8B7E6A] mt-1 flex items-center gap-1">
                      <span>📍</span> {client.location}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#E8DEC8]">
                      <p className="text-[10px] font-semibold text-[#8B6F47] uppercase tracking-wider">
                        ✦ Work Delivered
                      </p>
                      <p className="text-sm text-[#2B2419] mt-1 font-medium">
                        {client.workDone}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marqueeLTR {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          .animate-marquee-ltr {
            animation: marqueeLTR 35s linear infinite;
            display: flex;
            width: fit-content;
          }
          .animate-marquee-ltr:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}