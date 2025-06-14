import React, { useState, useEffect } from 'react';

interface Props {
  scanData: string;
  onClose: () => void;
}

interface Option {
  id: string;
  name: string;
}

const AddHardwareModal: React.FC<Props> = ({ scanData, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [manufacturerNumber, setManufacturerNumber] = useState('');
  const [yearOfPurchase, setYearOfPurchase] = useState('');

  const [supplyName, setSupplyName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [localName, setLocalName] = useState('');

  const [manufacturerOptions, setManufacturerOptions] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [locationOptions, setLocationOptions] = useState<Option[]>([]);

  useEffect(() => {
    // Charger les options depuis les endpoints PHP
    const fetchOptions = async () => {
      const [manRes, catRes, locRes] = await Promise.all([
        fetch('/api/get'),
        fetch('/api/get-categories'),
        fetch('/api/get-locations'),
      ]);
      const [manData, catData, locData] = await Promise.all([
        manRes.json(),
        catRes.json(),
        locRes.json(),
      ]);
      setManufacturerOptions(manData);
      setCategoryOptions(catData);
      setLocationOptions(locData);
    };

    fetchOptions();
  }, []);

  const handleSubmit = async () => {
    const scanPayload = {
      name,
      price,
      brand,
      manufacturer_number: manufacturerNumber,
      year_of_purchase: yearOfPurchase,
      supplyName,
      categoryName,
      localName,
    };

    const response = await fetch('/api/secure-proxy/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scanData: scanPayload }),
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert('Matériel ajouté avec succès !');
      onClose();
    } else {
      alert('Erreur: ' + result.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-4">Ajouter un matériel</h2>

        <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <input placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <input placeholder="Marque" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <select value={manufacturerNumber} onChange={(e) => setManufacturerNumber(e.target.value)} className="w-full border px-3 py-2 rounded">
          <option value="">Numéro de série fabricant</option>
          {manufacturerOptions.map((opt) => (
            <option key={opt.id} value={opt.name}>{opt.name}</option>
          ))}
        </select>
        <input placeholder="Année d'achat" value={yearOfPurchase} onChange={(e) => setYearOfPurchase(e.target.value)} className="w-full border px-3 py-2 rounded" />

        <select value={supplyName} onChange={(e) => setSupplyName(e.target.value)} className="w-full border px-3 py-2 rounded">
          <option value="">Fournisseur</option>
          {manufacturerOptions.map((opt) => (
            <option key={opt.id} value={opt.name}>{opt.name}</option>
          ))}
        </select>

        <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="w-full border px-3 py-2 rounded">
          <option value="">Catégorie</option>
          {categoryOptions.map((opt) => (
            <option key={opt.id} value={opt.name}>{opt.name}</option>
          ))}
        </select>

        <select value={localName} onChange={(e) => setLocalName(e.target.value)} className="w-full border px-3 py-2 rounded">
          <option value="">Localisation</option>
          {locationOptions.map((opt) => (
            <option key={opt.id} value={opt.name}>{opt.name}</option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Annuler</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Valider</button>
        </div>
      </div>
    </div>
  );
};

export default AddHardwareModal;
