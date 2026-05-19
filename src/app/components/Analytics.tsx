// // components/Analytics.tsx
// "use client";

// import Script from "next/script";

// const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your GA4 ID

// export function Analytics() {
//   return (
//     <>
//       <Script
//         strategy="afterInteractive"
//         src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
//       />
//       <Script
//         id="google-analytics"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', '${GA_MEASUREMENT_ID}', {
//               page_path: window.location.pathname,
//             });
//           `,
//         }}
//       />
//     </>
//   );
// }




"use client";

import Script from "next/script";

const GA_ID = "G-XXXXXXXXXX"; // Replace karo

export function Analytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"  // ✅ "afterInteractive" se badal ke "lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}