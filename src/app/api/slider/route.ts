import { NextResponse } from "next/server"

const banners = [
  { id: "1", title: "Produits Frais\ndu Sénégal", subtitle: "Livraison en 30 min", bg: "#2E7D32", emoji: "🥬" },
  { id: "2", title: "Poisson Frais\ndu Jour", subtitle: "-20% sur les produits halieutiques", bg: "#00838F", emoji: "🐟" },
  { id: "3", title: "Commandez\net Gagnez", subtitle: "Des points de fidélité", bg: "#E65100", emoji: "🎁" },
]

export async function GET() {
  return NextResponse.json(banners)
}
