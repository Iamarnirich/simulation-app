
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {
  const [cliniques, setCliniques] = useState([]);
  const [clinique, setClinique] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCliniques = async () => {
      const { data, error } = await supabase.from("cliniques").select("*");
      if (!error) {
        setCliniques(data);
        if (data.length > 0) setClinique(data[0].id);
      }
    };

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/connexion");
      } else {
        fetchCliniques();
      }
    };

    checkSession();
  }, [router]);

  const handleRecherche = async () => {
    setError("");
    setSuccess("");
    setTableData([]);
    const annee = new Date(dateDebut).getFullYear().toString();

    const { data, error } = await supabase
      .from("ventes_historiques")
      .select("service,volume_hist")
      .eq("clinique", clinique)
      .eq("periode", annee);

    if (error || !data) {
      setError("Aucune donnée trouvée pour cette clinique et période.");
      return;
    }
    console.log("Requête Supabase:", data);

    const lignes = data.map(({ service, volume_hist }) => ({
      service,
      volume_hist: volume_hist ?? 0,
      volume_prev: "",
      ca_prev: null,
      marge_prev: null,
    }));
    setTableData(lignes);
  };

  const handleVolumeChange = async (index, value) => {
    const updated = [...tableData];
    updated[index].volume_prev = value;

    const annee = new Date(dateDebut).getFullYear().toString();
    const service = updated[index].service;

    const { data, error } = await supabase.rpc("simuler_ca_marge", {
      p_clinique: clinique,
      p_periode: annee,
      p_service: service,
      p_volume_prev: parseFloat(value),
    });

    if (!error && data && data.length > 0) {
      updated[index].ca_prev = data[0].ca_prev;
      updated[index].marge_prev = data[0].marge_prev;
    } else {
      updated[index].ca_prev = null;
      updated[index].marge_prev = null;
    }

    setTableData(updated);
  };

  const handleSave = async () => {
    const annee = new Date(dateDebut).getFullYear().toString();
    const entries = tableData
      .filter((row) => row.volume_prev && row.ca_prev && row.marge_prev)
      .map((row) => ({
        clinique,
        periode: annee,
        service: row.service,
        volume_prev: row.volume_prev,
        ca_prev: row.ca_prev,
        marge_prev: row.marge_prev,
      }));

    const { error } = await supabase.from("simulations").insert(entries);

    if (error) {
      setError("Erreur lors de l'enregistrement des simulations.");
    } else {
      setSuccess("Les simulations ont été enregistrées avec succès.");
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans p-8 ">
      <div className="max-w-4xl mx-auto shadow-lg p-6 rounded-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-[#C6A664] mb-6">
          Simulation Chiffre d'affaires / Marge
        </h1>

        <div className="grid grid-cols-1 gap-4 mb-6 place-items-center">
          <div>
            <label className="block text-sm font-medium">Clinique</label>
            <select
              value={clinique}
              onChange={(e) => setClinique(e.target.value)}
              className="w-100 border rounded-full px-3 py-2"
            >
              {cliniques.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Date de début</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              className="w-100 border rounded-full px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date de fin</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              className="w-100 border rounded-full px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={handleRecherche}
          className="flex justify-center w-50 bg-[#C6A664] text-white font-semibold py-2 px-4 rounded-full hover:bg-[#b3974e] mb-6 mx-auto block"
        >
          Historique CA
        </button>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-[#b3974e] text-center mb-4">{success}</p>
        )}

        {tableData.length > 0 && (
          <>
            <table className="w-full border text-sm mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Clinique</th>
                  <th className="border px-3 py-2">Service</th>
                  <th className="border px-3 py-2">Volume</th>
                  <th className="border px-3 py-2">Volume prev</th>
                  <th className="border px-3 py-2">Taux de marge</th>
                  <th className="border px-3 py-2">CA prev (€)</th>
                  <th className="border px-3 py-2">Marge prev (€)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => {
                  const cliniqueData = cliniques.find((c) => c.id === clinique);
                  return (
                    <tr key={index}>
                      <td className="border px-3 py-2">{clinique}</td>
                      <td className="border px-3 py-2">{row.service}</td>
                      <td className="border px-3 py-2 text-right">
                        {row.volume_hist}
                      </td>
                      <td className="border px-3 py-2 text-right">
                        <input
                          type="number"
                          value={row.volume_prev}
                          onChange={(e) =>
                            handleVolumeChange(index, e.target.value)
                          }
                          className="w-20 border rounded px-2 py-1 text-right"
                        />
                      </td>
                      <td className="border px-3 py-2 text-right">
                        {cliniqueData?.tx_marge
                          ? `${(cliniqueData.tx_marge * 100).toFixed(1)} %`
                          : "0"}
                      </td>
                      <td className="border px-3 py-2 text-right">
                        {row.ca_prev !== null
                          ? Number(row.ca_prev).toLocaleString("fr-FR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                          : "0"}
                      </td>
                      <td className="border px-3 py-2 text-right">
                        {row.marge_prev !== null
                          ? Number(row.marge_prev).toLocaleString("fr-FR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                          : "0"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button
              onClick={handleSave}
              className="w-60 bg-[#C6A664] text-white font-semibold py-2 px-4 rounded-full hover:bg-[#C6A664]-700 mx-auto block"
            >
              Enregistrer les simulations
            </button>
          </>
        )}
      </div>
    </main>
  );
}
