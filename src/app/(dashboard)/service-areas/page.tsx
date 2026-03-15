"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Save, X, MapPin } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"

type Area = {
  id: number
  name: string
  country: string
  lat: string
  lng: string
  radius: string
  deliveryFee: number
  status: string
  createdAt: string
}

const mockAreas: Area[] = [
  { id: 1, name: "Dakar", country: "Sénégal", lat: "14.6928", lng: "-17.4467", radius: "15", deliveryFee: 500, status: "Active", createdAt: "2025-01-01" },
  { id: 2, name: "Rufisque", country: "Sénégal", lat: "14.7154", lng: "-17.2727", radius: "10", deliveryFee: 750, status: "Active", createdAt: "2025-01-15" },
  { id: 3, name: "Pikine", country: "Sénégal", lat: "14.7456", lng: "-17.3957", radius: "8", deliveryFee: 600, status: "Active", createdAt: "2025-02-01" },
  { id: 4, name: "Guédiawaye", country: "Sénégal", lat: "14.7712", lng: "-17.3987", radius: "7", deliveryFee: 650, status: "Inactive", createdAt: "2025-03-01" },
]

const emptyForm = { name: "", country: "Sénégal", lat: "", lng: "", radius: "10", deliveryFee: 500 }

export default function ServiceAreasPage() {
  const [areas, setAreas] = useState(mockAreas)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [editForm, setEditForm] = useState<Partial<Area>>({})

  const addArea = () => {
    if (!form.name || !form.lat || !form.lng) return
    const id = Math.max(...areas.map(a => a.id)) + 1
    setAreas(prev => [...prev, { ...form, id, status: "Active", createdAt: "2026-03-15", deliveryFee: Number(form.deliveryFee), radius: form.radius }])
    setForm(emptyForm)
    setShowForm(false)
  }

  const saveEdit = () => {
    setAreas(prev => prev.map(a => a.id === editId ? { ...a, ...editForm } : a))
    setEditId(null)
  }

  const toggleStatus = (id: number) => {
    setAreas(prev => prev.map(a => a.id === id ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" } : a))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" /> Zones de service
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg"
        >
          <Plus size={14} /> Ajouter une zone
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5">
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Nouvelle zone de service</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Nom de la zone *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Ex: Thiès" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Pays</label>
              <input value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Latitude *</label>
              <input value={form.lat} onChange={e => setForm(p => ({ ...p, lat: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full font-mono focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="14.6928" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Longitude *</label>
              <input value={form.lng} onChange={e => setForm(p => ({ ...p, lng: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full font-mono focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="-17.4467" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Rayon (km)</label>
              <input value={form.radius} onChange={e => setForm(p => ({ ...p, radius: e.target.value }))}
                type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Frais de livraison (FCFA)</label>
              <input value={form.deliveryFee} onChange={e => setForm(p => ({ ...p, deliveryFee: Number(e.target.value) }))}
                type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addArea} className="flex items-center gap-1.5 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"><Save size={13} /> Enregistrer</button>
            <button onClick={() => setShowForm(false)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200"><X size={13} /> Annuler</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["N°", "Zone", "Pays", "Coordonnées", "Rayon", "Frais livraison", "Statut", "Créé le", "Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {areas.map((a, i) => (
              <tr key={a.id} className="hover:bg-gray-50/80">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {editId === a.id ? (
                    <input value={editForm.name ?? a.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                      className="border rounded px-2 py-1 text-sm w-28 focus:outline-none" />
                  ) : a.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{a.country}</td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600">
                  {editId === a.id ? (
                    <div className="flex gap-1">
                      <input value={editForm.lat ?? a.lat} onChange={e => setEditForm(p => ({ ...p, lat: e.target.value }))}
                        className="border rounded px-1 py-1 text-xs w-20 focus:outline-none" />
                      <input value={editForm.lng ?? a.lng} onChange={e => setEditForm(p => ({ ...p, lng: e.target.value }))}
                        className="border rounded px-1 py-1 text-xs w-20 focus:outline-none" />
                    </div>
                  ) : `${a.lat}, ${a.lng}`}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {editId === a.id ? (
                    <input value={editForm.radius ?? a.radius} onChange={e => setEditForm(p => ({ ...p, radius: e.target.value }))}
                      type="number" className="border rounded px-2 py-1 text-sm w-16 focus:outline-none" />
                  ) : `${a.radius} km`}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-700">
                  {editId === a.id ? (
                    <input value={editForm.deliveryFee ?? a.deliveryFee} onChange={e => setEditForm(p => ({ ...p, deliveryFee: Number(e.target.value) }))}
                      type="number" className="border rounded px-2 py-1 text-sm w-20 focus:outline-none" />
                  ) : `${a.deliveryFee.toLocaleString()} FCFA`}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleStatus(a.id)}>
                    <StatusBadge status={a.status} />
                  </button>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{a.createdAt}</td>
                <td className="px-4 py-3">
                  {editId === a.id ? (
                    <div className="flex gap-1">
                      <button onClick={saveEdit} className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"><Save size={12} /></button>
                      <button onClick={() => setEditId(null)} className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"><X size={12} /></button>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <button onClick={() => { setEditId(a.id); setEditForm({}) }} className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"><Edit size={12} /></button>
                      <button onClick={() => setAreas(prev => prev.filter(x => x.id !== a.id))} className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={12} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
