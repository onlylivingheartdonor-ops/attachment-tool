export const metadata = {
  title: "Email Attachment Size Checker | Check Gmail & Outlook Limits",
  description: "Check whether a file can be sent as an email attachment. See size limits for Gmail, Outlook, Yahoo, and iCloud Mail before sending. Accounts for MIME encoding automatically.",

  alternates: {
    canonical: "https://www.emailattachmentsize.com",
  },

  openGraph: {
    title: "Email Attachment Size Checker | Check Gmail & Outlook Limits",
    description: "Check whether a file can be sent as an email attachment. See size limits for Gmail, Outlook, Yahoo, and iCloud Mail before sending.",
    url: "https://www.emailattachmentsize.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.emailattachmentsize.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Email Attachment Size Checker — Check if your file will send",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Email Attachment Size Checker | Check Gmail & Outlook Limits",
    description: "Check whether a file can be sent as an email attachment. See size limits for Gmail, Outlook, Yahoo, and iCloud Mail.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Email Attachment Size Checker",
              description: "Free tool to check if a file can be sent as an email attachment across Gmail, Outlook, Yahoo Mail, and iCloud Mail. Accounts for MIME encoding automatically.",
              url: "https://www.emailattachmentsize.com",
              applicationCategory: "UtilityApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}