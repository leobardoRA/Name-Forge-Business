import "./globals.css";
export const metadata = {
  title: "Name Generator",
  description: "Generate cool names instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 to-slate-700 min-h-screen text-white">
        {children}
      </body>
    </html>
  );
}