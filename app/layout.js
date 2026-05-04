import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sushi Siema — Premium Sushi & Japanese Cuisine in Warsaw",
  description:
    "Experience authentic Japanese flavors in the heart of Warsaw. Fresh sushi rolls, premium sets, and traditional dishes crafted by master chefs. Order online for delivery or dine-in.",
  keywords:
    "sushi, rolls, Japanese food, Warsaw, delivery, Sushi Siema, restaurant, maki, nigiri, ramen",
  openGraph: {
    title: "Sushi Siema — Premium Sushi & Japanese Cuisine",
    description:
      "Fresh sushi rolls and Japanese cuisine delivered to your door in Warsaw.",
    type: "website",
    locale: "en_US",
  },
};

import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
            <Cart />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
