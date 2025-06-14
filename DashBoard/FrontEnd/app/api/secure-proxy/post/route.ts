// pages/api/tonApi.ts (ou .js selon ton setup)
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scanData } = body;

    if (!scanData || typeof scanData !== 'object') {
      return NextResponse.json({ status: 'error', message: 'scanData manquant ou invalide' }, { status: 400 });
    }

    const response = await fetch('http://localhost:8000/api/addhardware.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scanData }),
    });

    if (!response.ok) {
      throw new Error(`Erreur de l'API PHP : ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur lors de la requête POST :', error);
    return NextResponse.json({ status: 'error', message: 'Erreur serveur' }, { status: 500 });
  }
}