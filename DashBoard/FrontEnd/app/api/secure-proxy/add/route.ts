import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Appel vers l’API PHP (par ex. avec fetch)
    const response = await fetch('http://localhost:8000/api/addhardware.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();  // Important: parse en JSON

    return NextResponse.json(result);

  } catch (err) {
    console.error("❌ Erreur API sécurisée:", err);
    return NextResponse.json(
      { status: "error", message: "Requête invalide ou échouée" },
      { status: 400 }
    );
  }
}
