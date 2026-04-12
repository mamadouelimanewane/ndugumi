import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const orderData = await req.json()
    console.log("New order received:", orderData)

    // Simulation de création de commande réussie
    const newOrder = {
      id: "ord-" + Math.random().toString(36).substr(2, 9),
      ...orderData,
      status: "PENDING",
      createdAt: new Date().toISOString()
    }

    const response = NextResponse.json(newOrder)
    response.headers.set("Access-Control-Allow-Origin", "*")
    return response

  } catch (error) {
    return NextResponse.json({ message: "Erreur lors de la création de la commande" }, { status: 500 })
  }
}

export async function GET() {
   // Mock list of orders
   const orders = [
     { id: "1", merchantName: "Marché Keur Massar", total: 4500, status: "COMPLETED", date: "2024-03-20" },
     { id: "2", merchantName: "Marché Rufisque", total: 12000, status: "DELIVERING", date: "2024-03-21" },
   ]
   const response = NextResponse.json(orders)
   response.headers.set("Access-Control-Allow-Origin", "*")
   return response
}
