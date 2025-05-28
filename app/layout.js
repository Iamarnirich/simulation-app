import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Veternity Simulation",
  description: "Application de simulation de chiffre d'affaires pour Veternity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen font-sans text-gray-800">
        <NavBar />
        <main className="pt-24 max-w-7xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}

