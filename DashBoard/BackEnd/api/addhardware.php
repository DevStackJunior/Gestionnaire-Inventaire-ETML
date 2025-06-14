<?php
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Label\Font\OpenSans;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

ob_start();
require_once(__DIR__ . '/../src/data.php');

try {
    $db = Data::Database();
    $conn = $db->getConnection();
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur de connexion : ' . $e->getMessage()
    ]);
    ob_end_flush();
    exit();
}

$rawData = file_get_contents("php://input");

if (!$rawData) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Aucune donnée reçue'
    ]);
    ob_end_flush();
    exit();
}

$data = json_decode($rawData, true);

if ($data === null || !isset($data['scanData'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Données invalides ou manquantes'
    ]);
    ob_end_flush();
    exit();
}

$scanData = $data['scanData'];
$name = trim($scanData['name'] ?? '');
$price = trim($scanData['price'] ?? '');
$brand = trim($scanData['brand'] ?? '');
$manufacturer_number = trim($scanData['manufacturer_number'] ?? '');
$year_of_purchase = trim($scanData['year_of_purchase'] ?? '');

$supplyName = trim($scanData['supplyName'] ?? '');
$categoryName = trim($scanData['categoryName'] ?? '');
$localName = trim($scanData['localName'] ?? '');

if (
    !$name || !$price || !$brand || !$manufacturer_number ||
    !$year_of_purchase || !$categoryName || !$supplyName || !$localName
) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Champs obligatoires manquants'
    ]);
    ob_end_flush();
    exit();
}


// Récupérer les IDs depuis les noms
try {
$supplyId = $db->getIdFromName('t_manufacturer', 'name', 'manufacturer_id', $supplyName);
$categoryId = $db->getIdFromName('t_category', 'name', 'category_id', $categoryName);
$localId = $db->getIdFromName('t_location', 'office', 'location_id', $localName);

    if (!$supplyId || !$categoryId || !$localId) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Impossible de retrouver un ID pour la catégorie, le fournisseur ou le local.'
        ]);
        ob_end_flush();
        exit();
    }
    ////
    //
    //
    //Code pour récupérer le dernier identifiant et en crée un nouveau
    $sql = "SELECT hardware_id FROM t_hardware ORDER BY hardware_id DESC
    LIMIT 1;" ; // Remplacez "t_hardware" par le nom de votre table
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $lastID = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($lastID && isset($lastID['hardware_id'])) {
    // Retirer les lettres (ex: "HW") et convertir en entier
    $num = (int)substr($lastID['hardware_id'], 2);
    $num++;

    // Reformater en gardant le préfixe et les zéros
    $newID = 'HW' . str_pad($num, 4, '0', STR_PAD_LEFT);
    } else {
    // Aucun ID encore existant
    $newID = 'HW0001';
    }

    $sql = "INSERT INTO t_hardware (
        hardware_id, name, price, brand, manufacturer_number,
        year_of_purchase, category_id, manufacturer_id, location_id
    ) VALUES (
        :hardware_id, :name, :price, :brand, :manufacturer_number,
        :year_of_purchase, :category_id, :manufacturer_id, :location_id
    )";


    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':hardware_id' => $newID,
        ':name' => $name,
        ':price' => $price,
        ':brand' => $brand,
        ':manufacturer_number' => $manufacturer_number,
        ':year_of_purchase' => $year_of_purchase,
        ':manufacturer_id' => $supplyId,
        ':category_id' => $categoryId,
        ':location_id' => $localId
    ]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Matériel inséré avec succès',
        'id' => $newID
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur SQL : ' . $e->getMessage()
    ]);
}

ob_end_flush();
exit();
