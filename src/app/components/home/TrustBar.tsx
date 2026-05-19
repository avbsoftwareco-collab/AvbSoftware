// "use client";

// import Image from "next/image";

// const clients = [
//   { 
//     id: 1, 
//     name: "TechCorp Solutions", 
//     firmType: "IT Services", 
//     location: "Mumbai",
//     image: "/images/clients/placeholder-1.svg"
//   },
//   { 
//     id: 2, 
//     name: "FinSolve Group", 
//     firmType: "Financial Services", 
//     location: "Delhi",
//     image: "/images/clients/placeholder-1.svg"
//   },
//   // ... add more clients
// ];

// export default function TrustBar() {
//   return (
//     <section className="py-16 bg-gradient-to-b from-white to-slate-50/80 border-y border-slate-100">
//       <div className="container-custom">
//         {/* Section header */}
//         <div className="text-center mb-10">
//           <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
//             Trusted Partners
//           </p>
//           <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
//             Loved by businesses across India
//           </h3>
//           <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto mt-4" />
//         </div>

//         {/* Scrolling marquee */}
//         <div className="relative w-full overflow-hidden py-6">
//           <div className="flex animate-marquee-ltr">
//             {/* First set */}
//             {clients.map((client) => (
//               <div
//                 key={client.id}
//                 className="mx-5 flex-shrink-0 w-96 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
//               >
//                 {/* Large photo section */}
//                 <div className="relative w-full h-56 bg-slate-100">
//                   <Image
//                     src={client.image}
//                     alt={`${client.name} team`}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                     priority={client.id <= 2}
//                   />
//                 </div>
//                 {/* Client info below photo */}
//                 <div className="p-5">
//                   <h4 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
//                     {client.name}
//                   </h4>
//                   <p className="text-sm text-slate-500 mt-1">{client.firmType}</p>
//                   <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
//                     <span>📍</span> {client.location}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             {/* Duplicate for seamless loop */}
//             {clients.map((client) => (
//               <div
//                 key={`dup-${client.id}`}
//                 className="mx-5 flex-shrink-0 w-96 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
//               >
//                 <div className="relative w-full h-56 bg-slate-100">
//                   <Image
//                     src={client.image}
//                     alt={`${client.name} team`}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <div className="p-5">
//                   <h4 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
//                     {client.name}
//                   </h4>
//                   <p className="text-sm text-slate-500 mt-1">{client.firmType}</p>
//                   <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
//                     <span>📍</span> {client.location}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <p className="text-center text-xs text-slate-400 mt-6">
//           📸 Replace these placeholder images with actual client photos
//         </p>

//         <style jsx>{`
//           @keyframes marqueeLTR {
//             0% { transform: translateX(-50%); }
//             100% { transform: translateX(0); }
//           }
//           .animate-marquee-ltr {
//             animation: marqueeLTR 40s linear infinite;
//             display: flex;
//             width: fit-content;
//           }
//           .animate-marquee-ltr:hover {
//             animation-play-state: paused;
//           }
//         `}</style>
//       </div>
//     </section>
//   );
// }




"use client";

import Image from "next/image";

// Demo placeholder image (clean avatar)
const demoImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='25' fill='%2394a3b8'/%3E%3Cpath d='M20 80 Q50 60 80 80' stroke='%2394a3b8' stroke-width='8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E";

const clients = [
  { id: 1, name: "TechCorp Solutions", firmType: "IT Services", location: "Mumbai", image: demoImage },
  { id: 2, name: "FinSolve Group", firmType: "Financial Services", location: "Delhi", image: demoImage },
  { id: 3, name: "MediCare Innovations", firmType: "Healthcare", location: "Bangalore", image: demoImage },
  { id: 4, name: "EcoMart Retail", firmType: "E-commerce", location: "Chennai", image: demoImage },
  { id: 5, name: "DataFlow Analytics", firmType: "Data Science", location: "Hyderabad", image: demoImage },
  { id: 6, name: "BuildPro Constructions", firmType: "Real Estate", location: "Pune", image: demoImage },
  { id: 7, name: "CloudNine Hosting", firmType: "Cloud Services", location: "Kolkata", image: demoImage },
];

export default function TrustBar() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50/80 border-y border-slate-100">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Trusted Partners
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
            Loved by businesses across India
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Scrolling marquee — left to right */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="flex animate-marquee-ltr">
            {/* First set */}
            {clients.map((client) => (
              <div
                key={client.id}
                className="mx-4 flex-shrink-0 w-80 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image src={client.image} alt={client.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {client.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{client.firmType}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <span>📍</span> {client.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client) => (
              <div
                key={`dup-${client.id}`}
                className="mx-4 flex-shrink-0 w-80 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image src={client.image} alt={client.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {client.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{client.firmType}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <span>📍</span> {client.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          🚀 Replace these demo photos with actual client logos or team photos
        </p>

        <style jsx>{`
          @keyframes marqueeLTR {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
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