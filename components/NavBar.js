"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NavBar() {
  const [connected, setConnected] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setConnected(!!sessionData.session);
      setCheckingSession(false);
    };
    check();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/connexion");
  };

  if (checkingSession) return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Image src="/logo.png" alt="Veternity Logo" width={60} height={60} />
        <Link href="/" className="text-gray-700 hover:text-[#C6A664]">
          Accueil
        </Link>
      </div>

      <div className="space-x-6 text-sm font-medium flex items-center">
        <Link href="/a-propos" className="text-gray-700 hover:text-[#C6A664]">
          À propos
        </Link>

        {connected ? (
          <>
            <Link
              href="/simulation"
              className="text-gray-700 hover:text-[#C6A664]"
            >
              Simulation
            </Link>
            <Link
              href="/historique"
              className="text-gray-700 hover:text-[#C6A664]"
            >
              Historique
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-full bg-[#C6A664] text-white hover:bg-[#b3974e]"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link
            href="/connexion"
            className="px-4 py-1 rounded-full bg-[#C6A664] text-white hover:bg-[#b3974e]"
          >
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}
