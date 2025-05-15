'use client';

import { useState } from 'react';

export default function Page() {
  const [form, setForm] = useState({
    clinique: '',
    periode: '',
    service: '',
    volume_prev: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        volume_prev: parseFloat(form.volume_prev)
      })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Simulation CA & Marge
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="clinique"
            placeholder="Clinique"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="periode"
            placeholder="Période (ex: 2025)"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="service"
            placeholder="Service"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="volume_prev"
            type="number"
            placeholder="Volume prévu"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          >
            Simuler
          </button>
        </form>

        {result && result.ca_prev !== undefined && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Résultat :</h2>
        <p><strong>CA Prévisionnel :</strong> {result.ca_prev.toFixed(2)} €</p>
        <p><strong>Marge Prévisionnelle :</strong> {result.marge_prev.toFixed(2)} €</p>
      </div>
    )}

      </div>
    </div>
  );
}


