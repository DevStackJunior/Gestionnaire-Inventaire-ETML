<?php
$host = 'localhost';
$user = 'root';
$pass = 'root';
$db   = 'inventory_db';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Server version: " . $conn->server_info;
?>

