<?php
// init.php

// Chargement de la configuration (adapte le chemin si besoin)
$configs = require __DIR__ . '/config/config.php';

// Activation du reporting d'erreurs en mode dev
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Définir l'encodage des réponses
header('Content-Type: application/json; charset=utf-8');

// Connexion à la base de données avec PDO
try {
    $pdo = new PDO(
        $configs['dsn'],
        $configs['user'],
        $configs['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur de connexion à la base de données : ' . $e -> getMessage()
    ]);
    exit;
}

// Autoload (si tu utilises composer)
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
}

// Tu peux aussi initialiser ici des services, sessions, etc.

// Expose $pdo ou autres variables globales
return [
    'pdo' => $pdo,
    'config' => $configs,
];
