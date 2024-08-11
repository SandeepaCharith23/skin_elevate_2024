import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {cn} from '@/lib/utils'
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"] ,weight:['300','400','500','600','700'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Skin Elevate 2024",
  description: "Unlock the secrets to radiant skin with Skincare AI, the ultimate platform for personalized skincare. Harnessing the power of advanced AI and image processing technology, Skincare AI provides tailored skincare recommendations based on your unique skin type and conditions. Whether you're dealing with acne, eczema, or hyperpigmentation, our intelligent system analyzes your skin through uploaded images and offers expert advice on the best products and routines just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased',fontSans.variable)}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
