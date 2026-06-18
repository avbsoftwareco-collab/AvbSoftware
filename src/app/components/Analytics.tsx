



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