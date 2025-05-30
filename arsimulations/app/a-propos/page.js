export default function AProposPage() {
  return (
    <main className="relative min-h-[calc(100vh-120px)] mt-[63px] mb-[40px] bg-white/80 p-8">
      <div className="max-w-3xl mx-auto text-align: justify text-gray-800 relative z-10">
        <h1 className="text-5xl font-bold text-[#C6A664] text-left mb-20">
          À propos de l&apos;application
        </h1>

        <p className="mb-4">
          Cette application permet de réaliser des{" "}
          <strong>simulations de chiffre d&apos;affaires prévisionnel</strong> et de{" "}
          <strong>marge prévisionnelle</strong>, en se basant sur des données
          historiques réelles fournies par l&apos;entreprise.
        </p>

        <p className="mb-4">
          L&apos;objectif est de fournir à un commercial ou à un responsable de
          clinique un outil simple, visuel et rapide permettant d&apos;estimer les
          performances d&apos;un service sur une période donnée, avec un volume
          prévisionnel saisi à la main. Ces résultats sont automatiquement
          enregistrés pour pouvoir être consultés dans l&apos;onglet Historique.
        </p>

        <p className="mb-4">
          Ce projet a été conçu avec le souci de la lisibilité, de la fiabilité
          des résultats, et de la facilité d&apos;utilisation sur le terrain.
        </p>
      </div>
    </main>
  );
}
