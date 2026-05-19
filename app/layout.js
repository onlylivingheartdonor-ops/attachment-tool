export const metadata = {
  title: "Email Attachment Size Checker | Check Gmail & Outlook Limits",
  description: "Check whether a file can be sent as an email attachment. See size limits for Gmail, Outlook, Yahoo, and iCloud before sending.",
  
  alternates: {
    canonical: "https://www.emailattachmentsize.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "Email Attachment Size Checker | Check Gmail & Outlook Limits",
    description: "Check whether a file can be sent as an email attachment. See size limits for Gmail, Outlook, Yahoo, and iCloud before sending.",
    url: "https://www.emailattachmentsize.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://www.emailattachmentsize.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "Email Attachment Size Checker",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Email Attachment Size Checker | Check Gmail & Outlook Limits",
    description: "Check whether a file can be sent as an email attachment. See size limits for Gmail, Outlook, Yahoo, and iCloud before sending.",
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

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
