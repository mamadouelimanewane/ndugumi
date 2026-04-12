import { NextResponse } from "next/server"

const stores = [
  {
    id: "s1",
    name: "Marché Keur Massar",
    location: "Dakar",
    area: "Banlieue",
    rating: 4.9,
    deliveryTime: "25-40 min",
    minOrder: 2000,
    tag: "Populaire",
    emoji: "🏪"
  },
  {
    id: "s2",
    name: "Marché Rufisque",
    location: "Rufisque",
    area: "Centre",
    rating: 4.8,
    deliveryTime: "30-45 min",
    minOrder: 1500,
    emoji: "🛒"
  },
  {
    id: "s3",
    name: "Alimentation Médina",
    location: "Dakar",
    area: "Médina",
    rating: 4.7,
    deliveryTime: "15-25 min",
    minOrder: 1000,
    tag: "Nouveau",
    emoji: "🍞"
  }
]

export async function GET() {
  return NextResponse.json(stores)
}
