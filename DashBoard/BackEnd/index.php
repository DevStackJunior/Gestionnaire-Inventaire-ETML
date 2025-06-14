<?php
// index.php : point d'entrée frontal des API

// Définir le type de contenu JSON
header('Content-Type: application/json; charset=utf-8');

// Autoriser CORS (à adapter selon besoin)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Gestion requête OPTIONS (préflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Initialiser l'application (connexion DB etc)
$app = require __DIR__ . '/init.php';

// Récupérer la route appelée, exemple:
// URL : http://localhost:8000/api/GetInfo.php => route = "GetInfo"
$uri = $_SERVER['REQUEST_URI'];
$scriptName = $_SERVER['SCRIPT_NAME'];

// Nettoyer l'URL pour extraire le nom de fichier cible
// Supposons une URL du type /api/GetInfo.php ou /api/ManageItems.php
if (preg_match('#/api/([a-zA-Z0-9_-]+)\.php#', $uri, $matches)) {
    $script = $matches[1];
    $filepath = __DIR__ . "/api/{$script}.php";

    if (file_exists($filepath)) {
        // Inclure le script API ciblé
        require_once $filepath;
        exit;
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => "API '{$script}' non trouvée."]);
        exit;
    }
} else {
    // Route invalide ou racine => on peut afficher un message d'accueil ou une doc API
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Bienvenue sur l’API BackEnd. Utilisez /api/YourScript.php',
    ]);
    exit;
}
