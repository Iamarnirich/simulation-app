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
    <main className="relative min-h-[calc(100vh-103px)] mt-[63px] mb-[40px] bg-white/80 p-8">
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
          <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-[#EDE8D0] text-[#C6A664]">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Clinique</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-right">Période</th>
                <th className="px-4 py-3 text-right">Volume</th>
                <th className="px-4 py-3 text-right">CA (€)</th>
                <th className="px-4 py-3 text-right">Marge (€)</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {simulations.map((sim) => (
                <tr key={sim.id} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-left whitespace-nowrap">
                    {new Date(sim.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {sim.clinique}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{sim.service}</td>
                  <td className="px-4 py-2 text-right whitespace-nowrap">
                    {sim.periode}
                  </td>
                  <td className="px-4 py-2 text-right whitespace-nowrap">
                    {sim.volume_prev?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="px-4 py-2 text-right whitespace-nowrap">
                    {sim.ca_prev?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="px-4 py-2 text-right whitespace-nowrap">
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
