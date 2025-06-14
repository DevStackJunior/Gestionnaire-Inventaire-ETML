<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Accepter uniquement la méthode GET pour récupérer les données
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Méthode non autorisée. Utilisez GET."
    ]);
    exit();
}

require_once(__DIR__ . '/../src/data.php'); // Ajuste le chemin selon ta structure

try {
    $serial = isset($_GET['serial']) ? $_GET['serial'] : null;
    echo `Contenu saisit par scanner : $serial`;
    $db = Data::Database();
    $conn = $db->getConnection();

    // Récupérer un unique ID de hardware
    $sql = "SELECT * FROM t_hardware WHERE hardware_id = $serial limit 1" ;
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $result
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Erreur serveur : " . $e->getMessage()
    ]);
}

exit();
?>
