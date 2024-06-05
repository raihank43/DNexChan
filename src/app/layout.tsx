import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "IndoChan",
  description: "Modern Imageboard using Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="flex min-h-screen flex-col antialiased bg-gradient-to-b from-orange-200 to-white">
          {children}
        </main>
      </body>
    </html>
  );
}
