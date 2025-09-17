import Script from "next/script";

export default function GoogleAdsense() {

  //by default it is disabled. Remove the line below to enable it.
  return null;
  
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  
  return ( 
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_AD_PUBLISHER_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      /> 
      <Script id="adsbygoogle-init" strategy="afterInteractive">
        {`
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_AD_PUBLISHER_ID}",
            enable_page_level_ads: true
          });
        `}
      </Script>
    </>
  );
};
