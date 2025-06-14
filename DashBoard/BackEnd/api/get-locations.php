<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

// Accepter uniquement la méthode GET pour récupérer les données
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Méthode non autorisée. Utilisez GET."
    ]);
    exit();
}

require_once(__DIR__ . '/../src/data.php');

try {
    $db = Data::Database();
    $conn = $db->getConnection();
    $sql = "SELECT * FROM t_location";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $locations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'data' => $locations
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur lors de la récupération des catégories : ' . $e->getMessage()
    ]);
    http_response_code(500);
}
