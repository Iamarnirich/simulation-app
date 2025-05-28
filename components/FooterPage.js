import Image from "next/image";

export default function FooterPage() {
  return (
    <footer className="bg-[#3c3c3c] text-gray-300 py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/footer.png"
            alt="Veternity Logo Footer"
            width={260}
            height={60}
            className="mx-auto"
          />
        </div>

        {/* Ligne de séparation */}
        <hr className="border-gray-600 mb-4" />

        {/* Copyright */}
        <p className="text-sm">
          &copy; Veternity France {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
