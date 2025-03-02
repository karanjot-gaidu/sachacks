import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://clerk-next-app.vercel.app/"),
  title: "Next.js Clerk Template",
  description:
    "A simple and powerful Next.js template featuring authentication and user management powered by Clerk.",
  openGraph: { images: ["/og.png"] },
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#008170" },
          elements: {
            formButtonPrimary:
              "bg-[#008170] border border-[#008170] border-solid hover:bg-[#005B41] hover:text-white text-white",
            socialButtonsBlockButton:
              "bg-[#008170] border-[#008170] hover:bg-[#005B41] hover:border-[#008170] text-white",
            socialButtonsBlockButtonText: "font-semibold text-white",
            formButtonReset:
              "bg-[#232D3F] border border-solid border-[#008170] hover:bg-[#005B41] hover:border-[#008170] text-white",
            membersPageInviteButton:
              "bg-[#008170] border border-[#008170] border-solid hover:bg-[#005B41] text-white",
            card: "bg-[#232D3F] text-white",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-300",
            formFieldLabel: "text-white",
            formFieldInput: "bg-[#1A1A1A] text-white border-[#008170]",
            formFieldInputShowPasswordButton: "text-white",
            footerActionText: "text-white",
            footerActionLink: "text-[#008170] hover:text-[#005B41]",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-[#008170] hover:text-[#005B41]",
            formFieldSuccess: "text-[#008170]",
            formFieldError: "text-red-500",
            alertText: "text-white",
            alertTextDanger: "text-red-500",
            dividerText: "text-white",
            formHeaderTitle: "text-white",
            formHeaderSubtitle: "text-gray-300",
            otpCodeFieldInput: "bg-[#1A1A1A] text-white border-[#008170]",
          },
        }}
      >
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
        </head>
        <body className={`min-h-screen flex flex-col antialiased`}>
          <Navbar />
          {children}
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}
