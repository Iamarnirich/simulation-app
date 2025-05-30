import "./globals.css";
import NavBar from "@/components/NavBar";
import FooterPage from "@/components/FooterPage";

export const metadata = {
  title: "Veternity Simulation",
  description: "Application de simulation de chiffre d'affaires pour Veternity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <header>
          <NavBar />
        </header>
        <main className="flex-1 relative">{children}</main>
        <footer>
          <FooterPage />
        </footer>
      </body>
    </html>
  );
}
