import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Smart Agriculture Training | BAFE Instrumentation & Electronics",
  description:
    "Hands-on Instrumentation and Electronics Training for Agricultural and Biosystems Engineers. March 24–27, 2026 at Citystate Asturias Hotel, Palawan. Learn IoT, Arduino, ESP32, sensors, and robotics for smart agriculture.",
  keywords: [
    "Smart Agriculture",
    "IoT Training",
    "Arduino",
    "ESP32",
    "BAFE",
    "Agricultural Engineering",
    "Electronics",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
