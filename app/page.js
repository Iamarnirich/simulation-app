
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Image fixe et centrée */}
      <div className="fixed inset-0 z-0 bg-[url('/HISTOIRE-UNIQUE-HEADER.png')] bg-cover bg-center bg-no-repeat" />

      {/* Voile sombre fixe */}
      <div className="fixed top-[63px] left-0 right-0 bottom-0 bg-black/50 z-10" />

      {/* Contenu centré */}
      <div className="relative z-20 flex flex-col justify-center items-center h-screen text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Bienvenue sur Simulator !
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl drop-shadow">
          L'outil pour simuler votre chiffre d'affaires et vos marges.
        </p>
        <Link
          href="/connexion"
          className="bg-[#C6A664] hover:bg-[#b3974e] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          Commencer une simulation
        </Link>
      </div>
    </div>
  );
}
