import "./globals.css";
import Script from "next/script"; // Importamos el componente Script

export const metadata = {
  title: "Name Generator | Create your Brand & Gamertag",
  description: "Generate cool names instantly and visualize your brand identity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* SCRIPT DE ADSENSE - Este es el código que copiaste de la imagen */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8044604299130448"
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />
      </head>
      <body className="bg-gradient-to-br from-slate-900 to-slate-700 min-h-screen text-white">
        {children}
      </body>
    </html>
  );
}