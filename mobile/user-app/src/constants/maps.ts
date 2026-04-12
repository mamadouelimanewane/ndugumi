// ═══════════════════════════════════════════════════════
// Configuration Cartographie — LocationIQ
// ═══════════════════════════════════════════════════════
// Obtenez votre clé gratuite sur : https://locationiq.com/
// Plan gratuit = 5 000 requêtes/jour (tiles + geocoding)
// ═══════════════════════════════════════════════════════

export const LOCATIONIQ_KEY = "pk.REMPLACEZ_PAR_VOTRE_CLE_LOCATIONIQ"

// Tuiles de carte (OpenStreetMap via LocationIQ)
export const MAP_TILE_URL = `https://a-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${LOCATIONIQ_KEY}`

// API de géocodage inverse (coordonnées → adresse)
export const GEOCODE_REVERSE_URL = (lat: number, lon: number) =>
  `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${lat}&lon=${lon}&format=json`

// API de recherche d'adresse (texte → coordonnées)
export const GEOCODE_SEARCH_URL = (query: string) =>
  `https://us1.locationiq.com/v1/search?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=sn`
