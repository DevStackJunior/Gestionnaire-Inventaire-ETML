<?php
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

    $stmt = $conn->prepare("SELECT * FROM t_manufacturer");
    $stmt->execute();
    $manufacturers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success', 
        'data' => $manufacturers
    ]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
