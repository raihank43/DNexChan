import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IndoChan",
  description: "A simple and modern Indonesian image-based bulletin board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NextUIProvider>
          <NextTopLoader
            color="#7F1D1D"
            template='<div class="bar" role="bar">
          <div class="peg"></div></div></div>'
          />
          <main className="flex min-h-screen flex-col antialiased bg-gradient-to-b from-orange-200 to-white">
            {children}
          </main>
          <Toaster />
        </NextUIProvider>
      </body>
    </html>
  );
}
