import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const JWT_SECRET = process.env.NEXTAUTH_SECRET || "ndugumi-secret-key"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // En mode simulation/test, on accepte le compte test par défaut
    if (email === "770000000" && password === "123456") {
      return NextResponse.json({
        user: {
          id: "test-user-id",
          name: "Fatou Diop",
          phone: "770000000",
          email: "fatou@ndugumi.com",
          walletMoney: 50000,
        },
        token: "mock-jwt-token",
      })
    }

    // Recherche dans la DB
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: email }
        ]
      }
    })

    if (!user) {
      const res = NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
      res.headers.set("Access-Control-Allow-Origin", "*")
      res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
      res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
      return res
    }

    // Simulation reussie pour le moment
    const token = jwt.sign({ userId: user.id }, JWT_SECRET)

    const res = NextResponse.json({ user, token })
    res.headers.set("Access-Control-Allow-Origin", "*")
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return res
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } })
  }
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 })
  res.headers.set("Access-Control-Allow-Origin", "*")
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  return res
}
