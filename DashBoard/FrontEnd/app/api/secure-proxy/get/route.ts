import { NextResponse } from "next/server";

export async function GET() {
  try {
    const phpResponse = await fetch("http://localhost:8000/api/gethardware.php", {
      method: "GET",
    });

    if (!phpResponse.ok) {
      throw new Error("Erreur PHP: " + phpResponse.status);
    }

    const result = await phpResponse.json();

    return NextResponse.json(result);
  } catch (err) {
    console.error("Erreur API sécurisée:", err);
    return NextResponse.json(
      { status: "error", message: "Requête invalide ou échouée" },
      { status: 500 }
    );
  }
}
