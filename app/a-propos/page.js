export default function AProposPage() {
  return (
    <main className="relative min-h-[calc(100vh-103px)] mt-[63px] mb-[40px] bg-white/80 p-8">
      <div className="max-w-3xl mx-auto text-gray-800 relative z-10">
        <h1 className="text-3xl font-bold text-[#C6A664] mb-6">
          À propos de l'application
        </h1>

        <p className="mb-4">
          Cette application permet de réaliser des{" "}
          <strong>simulations de chiffre d’affaires prévisionnel</strong> et de{" "}
          <strong>marge prévisionnelle</strong>, en se basant sur des données
          historiques réelles fournies par l’entreprise.
        </p>

        <p className="mb-4">
          L’objectif est de fournir à un commercial ou à un responsable de
          clinique un outil simple, visuel et rapide permettant d’estimer les
          performances d’un service sur une période donnée, avec un volume
          prévisionnel saisi à la main. Ces résultats sont automatiquement
          enregistrés pour pouvoir être consultés dans l’onglet Historique.
        </p>

        <p className="mb-4">
          Ce projet a été conçu avec le souci de la lisibilité, de la fiabilité
          des résultats, et de la facilité d’utilisation sur le terrain.
        </p>
      </div>
    </main>
  );
}
