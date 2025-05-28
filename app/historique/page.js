
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import * as XLSX from "xlsx";

export default function HistoriquePage() {
  const [simulations, setSimulations] = useState([]);
  const [error, setError] = useState("");
  const [exportMessage, setExportMessage] = useState("");

  useEffect(() => {
    const fetchSimulations = async () => {
      const { data, error } = await supabase
        .from("simulations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Erreur lors du chargement des simulations.");
      } else {
        setSimulations(data);
      }
    };

    fetchSimulations();
  }, []);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      simulations.map((sim) => ({
        Date: new Date(sim.created_at).toLocaleDateString(),
        Clinique: sim.clinique,
        Service: sim.service,
        Période: sim.periode,
        "Volume prévisionnel": sim.volume_prev,
        "CA prévisionnel (€)": sim.ca_prev,
        "Marge prévisionnelle (€)": sim.marge_prev,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Simulations");
    XLSX.writeFile(workbook, "historique_simulations.xlsx");

    setExportMessage("Fichier Excel téléchargé avec succès !");
    setTimeout(() => setExportMessage(""), 4000);
  };

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#C6A664] mb-6">
          Historique des simulations enregistrées
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {exportMessage && (
          <p className="text-green-600 mb-4 font-medium">{exportMessage}</p>
        )}

        <div className="flex justify-end mb-4">
          <button
            onClick={handleExport}
            className="bg-[#000000] text-white px-4 py-2 rounded-full hover:bg-[#C6A664]"
          >
            Exporter en Excel
          </button>
        </div>

        <div className="overflow-auto border rounded-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Clinique</th>
                <th className="border px-4 py-2">Service</th>
                <th className="border px-4 py-2">Période</th>
                <th className="border px-4 py-2">Volume</th>
                <th className="border px-4 py-2">CA (€)</th>
                <th className="border px-4 py-2">Marge (€)</th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((sim) => (
                <tr key={sim.id}>
                  <td className="border px-4 py-2">
                    {new Date(sim.created_at).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{sim.clinique}</td>
                  <td className="border px-4 py-2">{sim.service}</td>
                  <td className="border px-4 py-2">{sim.periode}</td>
                  <td className="border px-4 py-2 text-right">
                    {sim.volume_prev}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {sim.ca_prev?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {sim.marge_prev?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
