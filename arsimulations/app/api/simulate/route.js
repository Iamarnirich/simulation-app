import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
  try {
    const body = await request.json();
    const { clinique, periode, service, volume_prev } = body;

    const { data, error } = await supabase.rpc('simuler_ca_marge', {
      p_clinique: clinique,
      p_periode: periode,
      p_service: service,
      p_volume_prev: volume_prev,
    });

    if (error || !data || data.length === 0) {
      console.error("Erreur Supabase ou aucune donnée :", error);
      return new Response(JSON.stringify({ error: error?.message || "Aucune donnée" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data[0]), {
      status: 200,
    });
  } catch (err) {
    console.error("Erreur serveur :", err);
    return new Response(JSON.stringify({ error: "Erreur interne du serveur" }), {
      status: 500,
    });
  }
}

