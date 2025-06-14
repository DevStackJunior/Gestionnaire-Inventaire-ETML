'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  category_id: string;
  name: string;
}

interface Location {
  location_id: string;
  room_number: string;
  type: string;
  office: string;
}

interface ManufacturerName {
  manufacturer_id: string;
  name: string;
}

export default function AddHardwarePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    year_of_purchase: '',
    manufacturer_number: '',
    categoryName: '',
    supplyName: '',
    localName: '',
    room_number: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [manufacturerNames, setManufacturerNames] = useState<ManufacturerName[]>([]);
  const [message, setMessage] = useState('');

  const fetchCategories = async () => {
    const res = await fetch('/api/secure-proxy/get/get-categories');
    const data = await res.json();
    if (data.status === 'success') setCategories(data.data || []);
  };

  const fetchLocations = async () => {
    const res = await fetch('/api/secure-proxy/get/get-locations');
    const data = await res.json();
    if (data.status === 'success') setLocations(data.data || []);
  };

  const fetchManufacturers = async () => {
    const res = await fetch('/api/secure-proxy/get/get-manufacturers');
    const data = await res.json();
    if (data.status === 'success') setManufacturerNames(data.data || []);
  };

  useEffect(() => {
    fetchCategories();
    fetchLocations();
    fetchManufacturers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/secure-proxy/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scanData: formData }),
    });

    const result = await res.json();

    if (result.status === 'success') {
      setMessage('✅ Matériel ajouté avec succès !');
      router.refresh();
    } else {
      setMessage(result.message || "❌ Erreur lors de l'ajout.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un matériel</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded text-sm ${
            message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="name" placeholder="Nom" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="price" placeholder="Prix (€)" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="brand" placeholder="Marque" value={formData.brand} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="manufacturer_number" placeholder="Numéro fabricant" value={formData.manufacturer_number} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input
          type="date"
          name="year_of_purchase"
          value={formData.year_of_purchase}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select name="supplyName" value={formData.supplyName} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Choisir un fabricant</option>
          {manufacturerNames.map((m) => (
            <option key={m.manufacturer_id} value={m.name}>{m.name}</option>
          ))}
        </select>

        <select name="categoryName" value={formData.categoryName} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Choisir une catégorie</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <select name="localName" value={formData.localName} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Choisir un local</option>
          {locations.map((l) => (
            <option key={l.location_id} value={l.office}>{l.room_number} – {l.office}</option>
          ))}
        </select>

        <input name="room_number" placeholder="Nom du local (ex: B123)" value={formData.room_number} onChange={handleChange} required className="w-full p-2 border rounded" />

        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold rounded">Ajouter</button>
      </form>
    </div>
  );
}
