<?php
class Data {
    private $conn;
    private static $instance = null;

    // Constructeur privé pour empêcher l'instanciation en dehors de la classe
    private function __construct() {
        // Inclure la configuration
        $configs = include(__DIR__ . '/../config/config.php');  // Assurez-vous que le chemin est correct

        try {
            // Créer la connexion PDO en utilisant le DSN et les autres informations
            $this->conn = new PDO($configs['dsn'], $configs['user'], $configs['password']);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            // Relancer l'exception en la gérant ailleurs
            throw new Exception("Erreur de connexion à la base de données : " . $e->getMessage());
        }
    }

    // Méthode pour obtenir l'instance de la connexion
    public static function Database() {
        if (self::$instance === null) {
            self::$instance = new Data();
        }
        return self::$instance;
    }

    // Méthode pour obtenir la connexion PDO
    public function getConnection() {
        return $this->conn;
    }
    public function getIdFromName($table, $nameColumn, $idColumn, $nameValue) {
        $sql = "SELECT $idColumn FROM $table WHERE $nameColumn = :nameValue LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nameValue', $nameValue, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ? $result[$idColumn] : null;
    }
    public static function SanitizeQr($data){
        $data = trim($data); 
        $data = strip_tags($data); 
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        return $data;
    }
}
?>