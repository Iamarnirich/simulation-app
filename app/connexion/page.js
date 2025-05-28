"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/simulation");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Image de fond */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/HISTOIRE-UNIQUE-HEADER.png"
          alt="Fond Veternity"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay noir fixe */}
      <div className="fixed top-[63px] left-0 right-0 bottom-0 bg-black/60 z-10 backdrop-blur-sm" />

      {/* Formulaire d'authentification */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#000000]">
            {isLogin ? "Connexion" : "Inscription"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C6A664] transition"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C6A664] transition"
            />
            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#C6A664] hover:bg-[#b3974e] text-white font-semibold py-2 rounded-full shadow-md transition"
            >
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#000000] hover:underline font-semibold"
            >
              {isLogin
                ? "Pas encore de compte ? Créez-en un"
                : "Déjà un compte ? Connectez-vous"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
