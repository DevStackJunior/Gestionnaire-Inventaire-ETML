<?php
// Tableau de configuration pour la base de données
$configs = array(
    'db'      => "mysql",          // Type de la base de données
    'host'    => "localhost",      // Hôte de la base de données
    'dbname'  => "inventory_db",   // Nom de la base de données
    'user'    => 'root',           // Nom d'utilisateur pour la base de données
    'password' => 'root',          // Mot de passe (ajoute-le si nécessaire)
);

// Créer la chaîne DSN pour PDO
$configs["dsn"] = $configs["db"] . ":host=" . $configs["host"] . ";port=3308;dbname=" . $configs["dbname"];

// Retourner la configuration
return $configs;
