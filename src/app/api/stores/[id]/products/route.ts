import { NextResponse } from "next/server"

const mockProducts: Record<string, any[]> = {
  "s1": [
    { id: "p1", name: "Oignons Rouges", price: 1200, emoji: "🧅" },
    { id: "p2", name: "Pommes de Terre", price: 800, emoji: "🥔" },
    { id: "p3", name: "Piment Vert", price: 500, emoji: "🌶️" },
    { id: "p4", name: "Ail Frais", price: 600, emoji: "🧄" },
  ],
  "s2": [
    { id: "p5", name: "Thiof de Dakar", price: 8500, emoji: "🐟" },
    { id: "p6", name: "Crevettes Roses", price: 4500, emoji: "🦐" },
    { id: "p7", name: "Daurade Royale", price: 3200, emoji: "🐠" },
  ],
  "s3": [
    { id: "p8", name: "Gigot d'Agneau", price: 7500, emoji: "🥩" },
    { id: "p9", name: "Filet de Boeuf", price: 5500, emoji: "🐂" },
    { id: "p10", name: "Poulet Fermier", price: 3000, emoji: "🍗" },
  ]
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const storeId = params.id
  const products = mockProducts[storeId] || []
  
  const response = NextResponse.json(products)
  response.headers.set("Access-Control-Allow-Origin", "*")
  return response
}
