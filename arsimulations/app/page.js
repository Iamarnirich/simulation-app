import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-full min-h-full pt-[63px]">
      {/* Image de fond */}
      <div className="absolute inset-0 top-[63px] z-0 bg-[url('/HISTOIRE-UNIQUE-HEADER.png')] bg-cover bg-center bg-no-repeat" />

      {/* Voile sombre */}
      <div className="absolute inset-0 top-[63px] z-10 bg-black/50" />

      {/* Contenu centré */}
      <div className="relative z-20 flex flex-col justify-center items-center text-white text-center min-h-[calc(100vh-80px)] px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Bienvenue sur Simulator !
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl drop-shadow">
          L&apos;outil pour simuler votre chiffre d&apos;affaires et vos marges.
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
