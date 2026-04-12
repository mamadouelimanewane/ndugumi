import { NextResponse } from "next/server"

export async function GET() {
  const balance = {
    balance: 50000,
    currency: "FCFA"
  }
  
  const response = NextResponse.json(balance)
  response.headers.set("Access-Control-Allow-Origin", "*")
  return response
}
