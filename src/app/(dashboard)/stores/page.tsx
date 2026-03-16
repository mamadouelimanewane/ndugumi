"use client"

import { useState } from "react"
import { Plus, Info, Search, RefreshCw, Edit, Eye, BarChart2, Copy, Check, X, ExternalLink } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"
import Link from "next/link"

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ndugumi.vercel.app"

const mockStores = [
  { id: 1, name: "Marché Dior", phone: "+787386464", email: "Marchedior@gmail.com", address: "Dakar", rating: 5.0, walletMoney: 0, status: "Inactive" },
  { id: 2, name: "Le Marché des Professionnels", phone: "772161490", email: "ndugumipro@gmail.com", address: "Dakar", rating: 5.0, walletMoney: 0, status: "Inactive" },
  { id: 3, name: "Service Traiteur", phone: "771365304", email: "ndugumitraiteur@gmail.com", address: "Dakar", rating: 4.7, walletMoney: 0, status: "Inactive" },
  { id: 4, name: "France Mangasin test", phone: "0682258808", email: "ndame.kital@lndugumi.com", address: "Paris", rating: 0.3, walletMoney: 1866.50, status: "Active" },
  { id: 5, name: "MARCHE RUFISQUE1", phone: "761967539", email: "marcherufisque1@gmail.com", address: "Rufisque", rating: 5.0, walletMoney: 0, status: "Inactive" },
  { id: 6, name: "Marché Rufisque", phone: "00221787386565", email: "marcherufisque25@gmail.com", address: "Rufisque", rating: 5.0, walletMoney: 93544.00, status: "Active" },
  { id: 7, name: "Marché Keur Massar", phone: "221787386565", email: "marchekeurmassar@gmail.com", address: "Keur Massar", rating: 5.0, walletMoney: 220770.00, status: "Active" },
]

function generateToken(storeId: number, email: string): string {
  // Token simple basé sur storeId + email (base64)
  return btoa(`store:${storeId}:${email}:ndugumi2024`).replace(/=/g, "")
}

function getLoginUrl(store: (typeof mockStores)[0]): string {
  const token = generateToken(store.id, store.email)
  return `${BASE_URL}/merchant/login?store=${store.id}&token=${token}`
}

export default function StoresPage() {
  const [search, setSearch] = useState({ name: "", email: "", phone: "" })
  const [urlModal, setUrlModal] = useState<{ open: boolean; store: (typeof mockStores)[0] | null }>({ open: false, store: null })
  const [copied, setCopied] = useState(false)

  const filtered = mockStores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.name.toLowerCase()) &&
      s.email.toLowerCase().includes(search.email.toLowerCase()) &&
      s.phone.includes(search.phone)
  )

  const openUrlModal = (store: (typeof mockStores)[0]) => {
    setUrlModal({ open: true, store })
    setCopied(false)
  }

  const copyUrl = async () => {
    if (!urlModal.store) return
    await navigator.clipboard.writeText(getLoginUrl(urlModal.store))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loginUrl = urlModal.store ? getLoginUrl(urlModal.store) : ""

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">📋</span>
          <h1 className="text-lg font-semibold text-gray-700">Liste des magasins</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/stores/new">
            <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors">
              <Plus size={16} />
            </button>
          </Link>
          <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors">
            <Info size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-end">
          <input
            placeholder="Nom"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
          />
          <input
            placeholder="Email"
            value={search.email}
            onChange={(e) => setSearch({ ...search, email: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
          />
          <input
            placeholder="Téléphone"
            value={search.phone}
            onChange={(e) => setSearch({ ...search, phone: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40"
          />
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40 text-gray-500">
            <option value="">Zone de service</option>
            <option>Dakar</option>
            <option>Rufisque</option>
            <option>Keur Massar</option>
          </select>
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Search size={16} />
          </button>
          <button
            onClick={() => setSearch({ name: "", email: "", phone: "" })}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="p-3 border-b border-gray-50 text-right text-xs text-gray-400">
          Rechercher : <input className="border border-gray-200 rounded px-2 py-1 ml-1 text-xs w-32 focus:outline-none" />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["N°", "Coordonnées", "Adresse", "URL de connexion", "Connexion directe", "Note", "Solde (FCFA)", "Action", "Statistiques"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((store, i) => (
              <tr key={store.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">Nom : {store.name}</div>
                  <div className="text-gray-500 text-xs">Tél. : {store.phone}</div>
                  <div className="text-gray-400 text-xs">Email : {store.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs text-gray-500">{store.address || "—"}</div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openUrlModal(store)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 text-white text-xs rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    <Copy size={12} />
                    URL connexion
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <a
                      href={getLoginUrl(store)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 bg-cyan-500 text-white text-xs rounded hover:bg-cyan-600 transition-colors"
                    >
                      <ExternalLink size={11} />
                      Connexion
                    </a>
                    <a
                      href={getLoginUrl(store)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500 transition-colors"
                    >
                      Incognito
                    </a>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-gray-700">{store.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">{store.walletMoney.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <StatusBadge status={store.status} />
                    <button className="p-1 text-orange-500 hover:bg-orange-50 rounded" title="Wallet">
                      <span className="text-xs font-bold">$</span>
                    </button>
                    <button className="p-1 text-blue-500 hover:bg-blue-50 rounded" title="Modifier">
                      <Edit size={14} />
                    </button>
                    <button className="p-1 text-green-500 hover:bg-green-50 rounded" title="Voir">
                      <Eye size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <BarChart2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 text-xs text-gray-400 border-t border-gray-50">
          Affichage de 1 à {filtered.length} sur {filtered.length} entrées
        </div>
      </div>

      {/* URL Modal */}
      {urlModal.open && urlModal.store && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-800">URL de connexion</h2>
                <p className="text-xs text-gray-500 mt-0.5">{urlModal.store.name}</p>
              </div>
              <button
                onClick={() => setUrlModal({ open: false, store: null })}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              {/* Store info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center text-xl">🏪</div>
                <div>
                  <div className="font-medium text-gray-800 text-sm">{urlModal.store.name}</div>
                  <div className="text-xs text-gray-500">{urlModal.store.email}</div>
                </div>
              </div>

              {/* URL box */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Lien de connexion au backoffice</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <span className="text-xs text-gray-600 break-all flex-1 font-mono">{loginUrl}</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-700">
                  📧 Envoyez ce lien au responsable du magasin. Il lui permettra d'accéder directement à son espace de gestion sans mot de passe.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={copyUrl}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copié !" : "Copier le lien"}
              </button>
              <a
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
              >
                <ExternalLink size={16} />
                Ouvrir
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
