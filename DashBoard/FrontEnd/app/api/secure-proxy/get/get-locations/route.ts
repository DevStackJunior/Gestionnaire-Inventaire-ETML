import { NextResponse } from "next/server";

export async function GET() {
  try {
    const PHPresponse = await fetch('http://localhost:8000/api/get-locations.php', {
            method: "GET"
        });
    if (!PHPresponse.ok) throw new Error('Erreur lors de la récupération des fournisseurs');
    const data = await PHPresponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur getSuppliers:', error);
    throw error;
  }
}