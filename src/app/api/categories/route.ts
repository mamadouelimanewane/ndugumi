import { NextResponse } from "next/server"

const categories = [
  { id: "1", name: "Légumes", emoji: "🥬", color: "#E8F5E9" },
  { id: "2", name: "Poisson", emoji: "🐟", color: "#E0F7FA" },
  { id: "3", name: "Viande", emoji: "🥩", color: "#FFEBEE" },
  { id: "4", name: "Céréales", emoji: "🌾", color: "#FFF8E1" },
  { id: "5", name: "Fruits", emoji: "🍎", color: "#FCE4EC" },
  { id: "6", name: "Boissons", emoji: "🥤", color: "#F3E5F5" },
]

export async function GET() {
  return NextResponse.json(categories)
}
