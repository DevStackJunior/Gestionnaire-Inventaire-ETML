# 📦 Dashboard d’emprunt de matériels (hardware)

Ce projet est un dashboard de gestion d’emprunt et de suivi de matériels, permettant l’ajout, le référencement et la gestion de chaque équipement via un identifiant unique et un QR code.

---

## ✅ Fonctionnalités mises en place

- **Création d’un formulaire d’ajout de matériel** côté frontend avec Next.js :
  - Champs : `hardware_id`, `name`, `price`, `brand`, `yearOfPurchase`, `category`, `manufacturer`, `location`, etc.
  - Validation des champs côté client.

- **API backend en PHP (`addhardware.php`)** :
  - Traitement des requêtes POST.
  - Vérification du `hardware_id` (unicité, format, longueur).
  - Génération automatique d’un identifiant unique si absent.
  - Insertion sécurisée des données dans la base de données (avec PDO).

- **Correspondance des noms aux identifiants en base** :
  - Conversion des noms (`category`, `manufacturer`, `location`) en `category_id`, `manufacturer_id`, etc.
  - Gestion des erreurs si des noms ne sont pas reconnus.

- **Génération automatique de QR codes** :
  - Création d’un QR code pour chaque matériel ajouté (contenant le `hardware_id`).
  - Enregistrement du QR code au format `.png` sur le serveur.

- **Réponse JSON standardisée** côté backend :
  - Retour clair de l’état de la requête (`success`, `error`, données, messages…).

- **Ajout et gestion des champs `location` `manufacturer` `category`** :
    Intégré au formulaire Next.js et inséré dans la base de données via l’API PHP.
  - location : permet de connaître où le hardware se situe en temps normal (lorsque non-empreinté)
  - manufacturer : permet de connaître la marque du fabricant de l'hardware
  - category : représente la catégorie du hardware (laptop, PC de bureau, serveur)

- **Tests, débogages et amélioration de l’UX** :
  - Gestion des erreurs côté frontend et backend.
  - Tests fonctionnels pour assurer la robustesse du système.

---

## 🧰 Technologies utilisées

### Frontend
- **Next.js** (React)
- **TypeScript** *(optionnel selon composants)*
- **React Hook Form** – gestion et validation de formulaire
- **Tailwind CSS** – stylisation

### Backend
- **PHP** (procédural)
- **MariaDB** – base de données relationnelle
- **PDO** – requêtes SQL sécurisées
- **phpqrcode** – génération de QR codes

### Divers
- **JSON** – format d’échange frontend/backend
- **Git & GitHub Desktop** – gestion de version
- *(Tests API via Postman | POST Method)*

---

## 📌 Objectif du projet

Permettre aux utilisateurs (ou gestionnaires) d’ajouter rapidement des matériels dans une base centralisée, avec génération automatique d’un QR code pour chaque équipement, afin de faciliter le suivi, l’identification physique et la gestion des emprunts. Lors de l'ajout, une impression automatique du QR Code sur les étiquettes via une imprimante portable P-Touch Printer s'effectue. 

---

## ⚙️ Contraintes techniques

- 🔹 **Liaison d'un serveur local ↔️ Dashboard (Front-End Website)**
- 🔹 **Chaque partie (back + front) est hébergée localement sur le même serveur**
- 🔹 **Aucune sécurisation nécessaire des API Endpoint**
  ➡️ *Les endpoints ne sont pas exposés sur le Web (usage strictement local)*


