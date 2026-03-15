"use client"

import { useState } from "react"
import { Plus, Download, Info, Edit, Trash2, Bell, CreditCard, FileText, Eye, MapPin, Smartphone, LogOut, Settings, RefreshCw, Search } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"

const mockUsers = [
  { id: 21138, name: "balde moussa", phone: "+221770100056", email: "baldemoussa1586@gmail.com", service: "ndugalma_food.no_ride", wallet: 0.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-15 12:57:39", status: "Active" },
  { id: 21137, name: "GUELADIO NDIAYE", phone: "+221768018534", email: "oumar21@live.fr", service: "ndugalma_food.no_ride", wallet: 0.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-15 12:09:52", status: "Active" },
  { id: 21136, name: "ndeya ndiaye", phone: "+221774745670", email: "ndeyend105@gmail.com", service: "ndugalma_food.no_ride", wallet: 0.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-15 11:17:08", status: "Active" },
  { id: 21135, name: "Rouguietou Diop", phone: "+221773189478", email: "rouguidiop17@icloud.com", service: "ndugalma_food.no_ride", wallet: 0.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-15 10:00:37", status: "Active" },
  { id: 21134, name: "Abdoul Hamid Araman", phone: "+221774200642", email: "abdoulhamid@gmail.com", service: "ndugalma_food.no_ride", wallet: 0.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-15 09:59:09", status: "Active" },
  { id: 21133, name: "Fatou Diallo", phone: "+221776543210", email: "fatoudiallo@gmail.com", service: "ndugalma_food.no_ride", wallet: 500.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-14 18:00:00", status: "Active" },
  { id: 21132, name: "Oumar Ba", phone: "+221765432109", email: "oumarba@gmail.com", service: "ndugalma_food.no_ride", wallet: 0.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-14 16:30:00", status: "Inactive" },
  { id: 21131, name: "Aissatou Ndiaye", phone: "+221754321098", email: "aissatound@gmail.com", service: "ndugalma_food.no_ride", wallet: 0.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-14 14:00:00", status: "Active" },
  { id: 21130, name: "Moussa Sarr", phone: "+221743210987", email: "moussasarr@gmail.com", service: "ndugalma_food.no_ride", wallet: 150.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-14 12:00:00", status: "Active" },
  { id: 21129, name: "Cheikh Diop", phone: "+221732109876", email: "cheikhdiop@gmail.com", service: "ndugalma_food.no_ride", wallet: 0.00, userType: "Retail", signupType: "App/Admin", signupFrom: "Application", date: "2026-03-14 10:00:00", status: "Blocked" },
]

const TOTAL_USERS = 20891
const PER_PAGE = 10

type ModalType = "notification" | "addMoney" | "deviceDetails" | "walletHistory" | null

export default function UsersPage() {
  const [searchBy, setSearchBy] = useState("Nom")
  const [searchText, setSearchText] = useState("")
  const [country, setCountry] = useState("")
  const [tableSearch, setTableSearch] = useState("")
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<ModalType>(null)
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null)

  // Notification form
  const [notif, setNotif] = useState({ title: "", message: "", image: "", promo: false, expireDate: "", url: "" })
  // Add Money form
  const [money, setMoney] = useState({ method: "Cash", type: "Credit", amount: "", receipt: "", description: "" })

  const filtered = mockUsers.filter((u) => {
    const q = tableSearch.toLowerCase()
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || String(u.id).includes(q)
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  function openModal(type: ModalType, user: typeof mockUsers[0]) {
    setSelectedUser(user)
    setModal(type)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span>👥</span>
          <h1 className="text-lg font-semibold text-gray-700">Gestion des utilisateurs</h1>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center" title="Ajouter"><Plus size={16} /></button>
          <button className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center" title="Exporter"><Download size={16} /></button>
          <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center" title="Aide"><Info size={16} /></button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 font-medium">Rechercher par :</span>
          <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40">
            <option>Nom</option>
            <option>Email</option>
            <option>Téléphone</option>
            <option>ID utilisateur</option>
            <option>Adresse</option>
            <option>Type d'inscription</option>
            <option>Source</option>
            <option>Numéro de parrainage</option>
            <option>Code de parrainage</option>
            <option>Type d'utilisateur</option>
          </select>
          <input placeholder="Saisir un texte" value={searchText} onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-48" />
          <select value={country} onChange={(e) => setCountry(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-36 text-gray-500">
            <option value="">--Pays--</option>
            <option>Sénégal</option>
            <option>France</option>
            <option>Côte d'Ivoire</option>
          </select>
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" title="Rechercher"><Search size={16} /></button>
          <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600" title="Réinitialiser" onClick={() => { setSearchText(""); setCountry("") }}><RefreshCw size={16} /></button>
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" title="Paramètres"><Settings size={16} /></button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="p-3 border-b border-gray-50 flex justify-between items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>Entrées :</span>
            <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1) }}
              className="border border-gray-200 rounded px-2 py-1 text-xs w-16 focus:outline-none">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            Rechercher :
            <input value={tableSearch} onChange={(e) => { setTableSearch(e.target.value); setPage(1) }}
              className="border border-gray-200 rounded px-2 py-1 ml-1 text-xs w-40 focus:outline-none" />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["N°", "ID utilisateur", "Détails", "Service", "Solde (FCFA)", "Inscription", "Date d'enregistrement", "Statut", "Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((user, i) => (
              <tr key={user.id} className="hover:bg-gray-50/80">
                <td className="px-4 py-3 text-gray-500">{(page - 1) * perPage + i + 1}</td>
                <td className="px-4 py-3 text-blue-600 font-medium cursor-pointer hover:underline">{user.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">{user.name}</div>
                  <div className="text-gray-500 text-xs">{user.phone}</div>
                  <div className="text-gray-400 text-xs">{user.email}</div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{user.service}</td>
                <td className="px-4 py-3 text-cyan-600 font-medium">{user.wallet.toFixed(2)}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  <div>Type : {user.userType}</div>
                  <div>Via : {user.signupType}</div>
                  <div>Source : {user.signupFrom}</div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{user.date}</td>
                <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap min-w-[200px]">
                    <button title="Modifier" className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"><Edit size={12} /></button>
                    <button title="Uploader document" className="p-1 bg-green-500 text-white rounded hover:bg-green-600"><FileText size={12} /></button>
                    <button title="Voir profil" className="p-1 bg-orange-500 text-white rounded hover:bg-orange-600"><Eye size={12} /></button>
                    <button title="Supprimer" className="p-1 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={12} /></button>
                    <button title="Envoyer notification" className="p-1 bg-orange-500 text-white rounded hover:bg-orange-600" onClick={() => openModal("notification", user)}><Bell size={12} /></button>
                    <button title="Ajouter de l'argent" className="p-1 bg-cyan-500 text-white rounded hover:bg-cyan-600" onClick={() => openModal("addMoney", user)}><CreditCard size={12} /></button>
                    <button title="Historique portefeuille" className="p-1 bg-purple-500 text-white rounded hover:bg-purple-600" onClick={() => openModal("walletHistory", user)}><FileText size={12} /></button>
                    <button title="Adresses enregistrées" className="p-1 bg-teal-500 text-white rounded hover:bg-teal-600"><MapPin size={12} /></button>
                    <button title="Détails appareil" className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => openModal("deviceDetails", user)}><Smartphone size={12} /></button>
                    <button title={user.status === "Active" ? "Désactiver" : "Activer"} className={`p-1 ${user.status === "Active" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"} text-white rounded`}>
                      <Settings size={12} />
                    </button>
                    <button title="Déconnexion forcée" className="p-1 bg-pink-500 text-white rounded hover:bg-pink-600"><LogOut size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-3 border-t flex items-center justify-between text-xs text-gray-500">
          <span>Affichage de {(page - 1) * perPage + 1} à {Math.min(page * perPage, filtered.length)} sur {TOTAL_USERS} entrées</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50">«</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50">‹</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
              return (
                <button key={p} onClick={() => setPage(p)}
                  className={`px-2.5 py-1 rounded border ${page === p ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 hover:bg-gray-50"}`}>
                  {p}
                </button>
              )
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-2 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50">»</button>
          </div>
        </div>
      </div>

      {/* Modal: Send Notification */}
      {modal === "notification" && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Envoyer une notification — {selectedUser.name}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Titre *</label>
                <input value={notif.title} onChange={(e) => setNotif({ ...notif, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Message *</label>
                <textarea value={notif.message} onChange={(e) => setNotif({ ...notif, message: e.target.value })} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Image (URL)</label>
                <input value={notif.image} onChange={(e) => setNotif({ ...notif, image: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="promo" checked={notif.promo} onChange={(e) => setNotif({ ...notif, promo: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="promo" className="text-sm text-gray-700">Afficher en promotion</label>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Date d'expiration</label>
                <input type="date" value={notif.expireDate} onChange={(e) => setNotif({ ...notif, expireDate: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">URL (lien)</label>
                <input value={notif.url} onChange={(e) => setNotif({ ...notif, url: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Annuler</button>
              <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600">Envoyer</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Money */}
      {modal === "addMoney" && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Ajouter de l'argent — {selectedUser.name}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Méthode de paiement</label>
                <select value={money.method} onChange={(e) => setMoney({ ...money, method: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option>Cash</option>
                  <option>Orange Money</option>
                  <option>Wave</option>
                  <option>Virement bancaire</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Type de transaction</label>
                <select value={money.type} onChange={(e) => setMoney({ ...money, type: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option>Crédit</option>
                  <option>Débit</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Montant (FCFA) *</label>
                <input type="number" value={money.amount} onChange={(e) => setMoney({ ...money, amount: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">N° de reçu</label>
                <input value={money.receipt} onChange={(e) => setMoney({ ...money, receipt: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Description</label>
                <textarea value={money.description} onChange={(e) => setMoney({ ...money, description: e.target.value })} rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Annuler</button>
              <button className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Device Details */}
      {modal === "deviceDetails" && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Détails appareil — {selectedUser.name}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4 space-y-2 text-sm">
              {[
                ["Appareil", "iPhone 14 Pro"],
                ["OS", "iOS 17.2"],
                ["Token FCM", "fXb2k9...mN3p"],
                ["Dernière activité", "2026-03-15 12:57"],
                ["IP", "41.82.xxx.xxx"],
                ["Version app", "2.4.1"],
              ].map(([k, v]) => (
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

      {/* Modal: Wallet History */}
      {modal === "walletHistory" && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-800">Historique portefeuille — {selectedUser.name}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-4">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>{["Date", "Type", "Montant", "Description", "Solde"].map(h => <th key={h} className="px-3 py-2 text-left text-gray-600">{h}</th>)}</tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="px-3 py-2 text-gray-500">2026-03-14</td><td className="px-3 py-2 text-green-600">Crédit</td><td className="px-3 py-2">500 FCFA</td><td className="px-3 py-2 text-gray-500">Remboursement commande</td><td className="px-3 py-2 font-medium">500 FCFA</td></tr>
                  <tr className="border-t bg-gray-50/50"><td className="px-3 py-2 text-gray-500">2026-03-10</td><td className="px-3 py-2 text-red-600">Débit</td><td className="px-3 py-2">200 FCFA</td><td className="px-3 py-2 text-gray-500">Paiement commande #3240</td><td className="px-3 py-2 font-medium">0 FCFA</td></tr>
                </tbody>
              </table>
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
