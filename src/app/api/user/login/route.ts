import { NextResponse } from "next/server"

// Route ultra-simplifiée pour diagnostic technique
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    // Données de test en dur (bypass DB)
    if (email === "770000000" && password === "123456") {
      return NextResponse.json({
        user: { id: "test", name: "Test User", phone: "770000000", email: "test@ndugumi.com", walletMoney: 1000 },
        token: "mock-token",
      }, { headers: { "Access-Control-Allow-Origin": "*" } })
    }

    return NextResponse.json({ message: "Identifiants invalides (test)" }, { 
      status: 401,
      headers: { "Access-Control-Allow-Origin": "*" }
    })
  } catch (error: any) {
    return NextResponse.json({ message: "Erreur serveur: " + error.message }, { 
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }
  })
}
