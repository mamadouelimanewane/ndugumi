"use client"

import { useState } from "react"
import { Plus, Download, Info, Edit, Eye, Trash2, Bell, CreditCard, FileText, MapPin, Smartphone, LogOut, RefreshCw, Search, ToggleLeft, Phone, PhoneOff, Star } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"

const tabs = [
  { label: "Inscription de base complète", count: 1673, color: "bg-blue-500" },
  { label: "Documents temporaires", count: 0, color: "bg-cyan-500" },
  { label: "Approbation en attente", count: 0, color: "bg-orange-400" },
  { label: "Détails en attente", count: 12, color: "bg-orange-500" },
  { label: "Livreurs rejetés", count: 0, color: "bg-red-500" },
]

const mockDrivers = [
  { id: 1973, area: "Dakar", name: "Bassirou Diao", phone: "+221764082948", email: "diaobassirou9@gmail.com", orders: 0, rating: "Non noté", earning: "Aucun service", walletMoney: "—", date: "2026-03-08 21:32:27", status: "Offline", calling: false },
  { id: 1951, area: "Dakar", name: "Abdoul Mohamed Rabo", phone: "+221787876984", email: "mrabo5232@gmail.com", orders: 0, rating: "Non noté", earning: "Aucun service", walletMoney: "—", date: "2026-02-07 02:51:16", status: "Offline", calling: false },
  { id: 1925, area: "Dakar", name: "Assane Diallo", phone: "+221784423110", email: "assanealbertdiallo2003@gmail.com", orders: 0, rating: "Non noté", earning: "Aucun service", walletMoney: "—", date: "2025-12-29 01:00:39", status: "Offline", calling: false },
  { id: 1910, area: "Dakar", name: "Mamadou Lamine Diallo", phone: "+221770000001", email: "mlddiallo@gmail.com", orders: 3, rating: "4.5", earning: "12 500", walletMoney: "8 200", date: "2025-11-15 10:00:00", status: "Online", calling: true },
  { id: 1890, area: "Dakar", name: "Ibrahima Sarr", phone: "+221776543210", email: "ibrahimasarr@gmail.com", orders: 12, rating: "4.8", earning: "45 000", walletMoney: "22 000", date: "2025-10-01 08:00:00", status: "Online", calling: true },
]

type DriverModal = "notification" | "addMoney" | "deviceDetails" | "walletHistory" | "documents" | null

export default function DriversPage() {
  const [activeTab, setActiveTab] = useState("")
  const [search, setSearch] = useState("")
  const [driverStatus, setDriverStatus] = useState("")
  const [countryFilter, setCountryFilter] = useState("")
  const [areaFilter, setAreaFilter] = useState("")
  const [perPage, setPerPage] = useState(50)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<DriverModal>(null)
  const [selectedDriver, setSelectedDriver] = useState<typeof mockDrivers[0] | null>(null)
  const [notif, setNotif] = useState({ title: "", message: "", image: "", promo: false, expireDate: "", url: "" })
  const [money, setMoney] = useState({ method: "Cash", type: "Crédit", amount: "", receipt: "", description: "" })

  const filtered = mockDrivers.filter((d) =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) || String(d.id).includes(search)
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  function openModal(type: DriverModal, driver: typeof mockDrivers[0]) {
    setSelectedDriver(driver)
    setModal(type)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span>🚗</span>
          <h1 className="text-lg font-semibold text-gray-700">Tous les livreurs</h1>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center" title="Exporter"><Download size={16} /></button>
          <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center" title="Ajouter livreur"><Plus size={16} /></button>
          <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center" title="Aide"><Info size={16} /></button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button key={tab.label} onClick={() => setActiveTab(tab.label === activeTab ? "" : tab.label)}
            className={`${tab.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity flex items-center gap-1.5 ${activeTab === tab.label ? "ring-2 ring-offset-1 ring-current" : ""}`}>
            {tab.label}
            <span className="bg-white/25 rounded-full px-1.5">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-end">
          <select value={driverStatus} onChange={(e) => setDriverStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-40 text-gray-500">
            <option value="">Statut livreur</option>
            <option>Actif</option>
            <option>Hors ligne</option>
            <option>En livraison</option>
            <option>Bloqué</option>
            <option>En attente approbation</option>
            <option>Documents rejetés</option>
            <option>Suspendu</option>
            <option>Nouveau</option>
            <option>Inactif</option>
          </select>
          <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-36 text-gray-500">
            <option value="">--Pays--</option>
            <option>Sénégal</option>
            <option>France</option>
          </select>
          <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-36 text-gray-500">
            <option value="">--Zone--</option>
            <option>Dakar</option>
            <option>Rufisque</option>
            <option>Pikine</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-52 text-gray-500">
            <option>ndugalma_food.vehicle_n...</option>
            <option>Moto</option>
            <option>Voiture</option>
            <option>Vélo</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-36 text-gray-500">
            <option>Rechercher par</option>
            <option>Nom</option>
            <option>ID</option>
            <option>Téléphone</option>
            <option>Email</option>
          </select>
          <input placeholder="Saisir un texte" value={search} onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40" />
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"><Search size={16} /></button>
          <button onClick={() => { setSearch(""); setDriverStatus(""); setCountryFilter(""); setAreaFilter("") }} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><RefreshCw size={16} /></button>
        </div>
      </div>

      {/* Entries selector */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm text-gray-500">Entrées par page</span>
        <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1) }}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-20">
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="p-3 border-b border-gray-50 flex justify-end items-center gap-2 text-xs text-gray-400">
          Rechercher : <input value={search} onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-2 py-1 ml-1 text-xs w-40 focus:outline-none" />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["N°", "ID", "Zone", "Détails livreur", "Statistiques", "Transactions", "Date inscription", "Statut", "Dernière position", "Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((d, i) => (
              <tr key={d.id} className="hover:bg-gray-50/80">
                <td className="px-4 py-3 text-gray-500">{(page - 1) * perPage + i + 1}</td>
                <td className="px-4 py-3 text-blue-600 font-semibold cursor-pointer hover:underline">{d.id}</td>
                <td className="px-4 py-3 text-gray-700">{d.area}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">{d.name}</div>
                  <div className="text-gray-500 text-xs">{d.phone}</div>
                  <div className="text-gray-400 text-xs">{d.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    Commandes : {d.orders}
                  </span>
                  <div className="flex items-center gap-0.5 mt-1">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-500 text-xs">{d.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">
                  <div>Gains : {d.earning}</div>
                  <div>Portefeuille : {d.walletMoney}</div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{d.date}</td>
                <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                <td className="px-4 py-3 text-gray-400 text-xs">—</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap min-w-[220px]">
                    <button title="Modifier" className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"><Edit size={12} /></button>
                    <button title="Voir profil" className="p-1 bg-green-500 text-white rounded hover:bg-green-600"><Eye size={12} /></button>
                    <button title="Supprimer" className="p-1 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={12} /></button>
                    <button title="Envoyer notification" className="p-1 bg-orange-500 text-white rounded hover:bg-orange-600" onClick={() => openModal("notification", d)}><Bell size={12} /></button>
                    <button title="Ajouter de l'argent" className="p-1 bg-cyan-500 text-white rounded hover:bg-cyan-600" onClick={() => openModal("addMoney", d)}><CreditCard size={12} /></button>
                    <button title="Historique portefeuille" className="p-1 bg-purple-500 text-white rounded hover:bg-purple-600" onClick={() => openModal("walletHistory", d)}><FileText size={12} /></button>
                    <button title="Voir documents" className="p-1 bg-teal-500 text-white rounded hover:bg-teal-600" onClick={() => openModal("documents", d)}><FileText size={12} /></button>
                    <button title="Adresses enregistrées" className="p-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"><MapPin size={12} /></button>
                    <button title="Détails appareil" className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => openModal("deviceDetails", d)}><Smartphone size={12} /></button>
                    <button title={d.calling ? "Retirer bouton appel" : "Ajouter bouton appel"} className={`p-1 ${d.calling ? "bg-red-400 hover:bg-red-500" : "bg-green-400 hover:bg-green-500"} text-white rounded`}>
                      {d.calling ? <PhoneOff size={12} /> : <Phone size={12} />}
                    </button>
                    <button title="Bloquer/Débloquer tracking" className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"><ToggleLeft size={12} /></button>
                    <button title="Déconnexion forcée" className="p-1 bg-pink-500 text-white rounded hover:bg-pink-600"><LogOut size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 text-xs text-gray-400 border-t flex items-center justify-between">
          <span>Affichage de {(page - 1) * perPage + 1} à {Math.min(page * perPage, filtered.length)} sur {filtered.length} entrées</span>
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-2 py-1 border border-gray-200 rounded disabled:opacity-40 hover:bg-gray-50">‹</button>
            <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs">{page}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2 py-1 border border-gray-200 rounded disabled:opacity-40 hover:bg-gray-50">›</button>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {modal === "notification" && selectedDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Envoyer notification — {selectedDriver.name}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4 space-y-3">
              <div><label className="text-xs text-gray-500 block mb-1">Titre *</label>
                <input value={notif.title} onChange={(e) => setNotif({ ...notif, title: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              <div><label className="text-xs text-gray-500 block mb-1">Message *</label>
                <textarea value={notif.message} onChange={(e) => setNotif({ ...notif, message: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" /></div>
              <div><label className="text-xs text-gray-500 block mb-1">Image (URL)</label>
                <input value={notif.image} onChange={(e) => setNotif({ ...notif, image: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="dpromo" checked={notif.promo} onChange={(e) => setNotif({ ...notif, promo: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="dpromo" className="text-sm text-gray-700">Afficher en promotion</label>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Annuler</button>
              <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600">Envoyer</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {modal === "addMoney" && selectedDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Ajouter de l'argent — {selectedDriver.name}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4 space-y-3">
              <div><label className="text-xs text-gray-500 block mb-1">Méthode de paiement</label>
                <select value={money.method} onChange={(e) => setMoney({ ...money, method: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Cash</option><option>Orange Money</option><option>Wave</option><option>Virement</option>
                </select></div>
              <div><label className="text-xs text-gray-500 block mb-1">Type</label>
                <select value={money.type} onChange={(e) => setMoney({ ...money, type: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Crédit</option><option>Débit</option>
                </select></div>
              <div><label className="text-xs text-gray-500 block mb-1">Montant (FCFA) *</label>
                <input type="number" value={money.amount} onChange={(e) => setMoney({ ...money, amount: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div><label className="text-xs text-gray-500 block mb-1">N° reçu</label>
                <input value={money.receipt} onChange={(e) => setMoney({ ...money, receipt: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div><label className="text-xs text-gray-500 block mb-1">Description</label>
                <textarea value={money.description} onChange={(e) => setMoney({ ...money, description: e.target.value })} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" /></div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Annuler</button>
              <button className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {/* Device Details Modal */}
      {modal === "deviceDetails" && selectedDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Détails appareil</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4 space-y-2 text-sm">
              {[["Appareil", "Samsung Galaxy A54"], ["OS", "Android 14"], ["Token FCM", "dYc3k1...pQ8m"], ["Dernière activité", "2026-03-08 21:32"], ["Version app", "2.4.1"]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">{k}</span>
                  <span className="text-gray-800 font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end p-4 border-t">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet History Modal */}
      {modal === "walletHistory" && selectedDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Portefeuille — {selectedDriver.name}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 text-center py-4">Aucune transaction enregistrée</p>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {modal === "documents" && selectedDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Documents — {selectedDriver.name}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4 space-y-2">
              {[["Pièce d'identité", "Validé"], ["Permis de conduire", "En attente"], ["Carte grise", "Non soumis"], ["Photo profil", "Validé"]].map(([doc, stat]) => (
                <div key={doc} className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-700">{doc}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stat === "Validé" ? "bg-green-100 text-green-700" : stat === "En attente" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}`}>{stat}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end p-4 border-t">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
