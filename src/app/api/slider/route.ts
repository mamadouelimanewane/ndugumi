import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const banners = await prisma.sliderBanner.findMany({
      where: { status: "Active" },
      orderBy: { sequence: 'asc' }
    })

    if (banners.length === 0) {
      // Return hardcoded if DB is empty for now
      return NextResponse.json([
        { id: "1", title: "Produits Frais\ndu Sénégal", subtitle: "Livraison en 30 min", bg: "#2E7D32", emoji: "🥬" },
        { id: "2", title: "Poisson Frais\ndu Jour", subtitle: "-20% sur les produits halieutiques", bg: "#00838F", emoji: "🐟" },
      ])
    }

    const formatted = banners.map(b => ({
      id: b.id,
      title: b.title,
      subtitle: "Offre spéciale",
      bg: "#2E7D32",
      emoji: b.image // Assuming emoji or URL
    }))

    return NextResponse.json(formatted)
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
