"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "../../i18n"; // Ensure i18n.js is imported
import { useEffect, useState } from "react"; // Import hooks
import { useTranslation } from "react-i18next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en"); // Default language

  useEffect(() => {
    // Retrieve saved language from localStorage or fallback to 'en'
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage); // Sync i18next language
    setLanguage(savedLanguage); // Update state
  }, []);

  return (
    <html lang={language} dir={language === "he" ? "rtl" : "ltr"}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
