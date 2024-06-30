import type { Metadata } from "next";
import {
  Inter,
  Montserrat,
  Lato,
  Raleway,
  Roboto_Slab,
  Noto_Sans,
  Source_Code_Pro,
  Poppins,
} from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import FooterComponent from "@/components/FooterComponent";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const raleway = Raleway({ subsets: ["latin"] });
const roboto_slab = Roboto_Slab({ subsets: ["latin"] });
const noto_sans = Noto_Sans({ subsets: ["latin"] });
const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "IndoChan",
  description: "AA simple and modern Indonesian image-based bulletin board",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextUIProvider>
          <NextTopLoader
            color="#7F1D1D"
            template='<div class="bar" role="bar">
          <div class="peg"></div></div></div>'
          />
          <main className="flex min-h-screen flex-col antialiased bg-gradient-to-b from-orange-200 to-white animate-gradient-x transition-all ease-in-out duration-500">
            {children}
            <FooterComponent />
          </main>
          <Toaster />
        </NextUIProvider>
      </body>
    </html>
  );
}
