# 📦 Dashboard d’emprunt de matériels (hardware)

Ce projet est un dashboard de gestion d’emprunt et de suivi de matériels, permettant l’ajout, le référencement et la gestion de chaque équipement via un identifiant unique et un QR code.

---

## 📌 Objectif du projet

Permettre aux utilisateurs (ou gestionnaires) d’ajouter rapidement des matériels dans une base centralisée, avec génération automatique d’un QR code pour chaque équipement, afin de faciliter le suivi, l’identification physique et la gestion des emprunts.  
Lors de l'ajout, une impression automatique du QR Code sur les étiquettes via une imprimante portable **P-Touch Printer** s'effectue.

---

## ✅ Fonctionnalités mises en place

### 🎯 Frontend – Next.js

- **Création d’un formulaire d’ajout de matériel** :
  - Champs : `hardware_id`, `name`, `price`, `brand`, `yearOfPurchase`, `category`, `manufacturer`, `location`, etc.
  - Validation dynamique via **React Hook Form**.

- **Ajout et gestion des champs `location`, `manufacturer`, `category`** :
  - Ces champs sont intégrés au formulaire et insérés en base via API.
    - `location` : lieu de stockage par défaut.
    - `manufacturer` : fabricant.
    - `category` : type d'équipement (laptop, PC, serveur…).

- **Tests, débogages et amélioration de l’UX** :
  - Gestion des erreurs côté client.
  - Prévisualisation et retour utilisateur (professeur).

---

### 🛠️ Backend – PHP + Proxy Next.js

#### 📁 API PHP : `addhardware.php`
- Traitement des requêtes POST.
- Vérification du `hardware_id` (unicité, format).
- Génération automatique si champ vide.
- Insertion sécurisée dans **MariaDB** via **PDO**.

#### 📁 API PHP : `gethardware.php`, `get-categories.php`, `get-locations.php`, `get-manufacturers.php`
- Traitement des requêtes GET.
- Retour des listes de catégories, localisations, fabricants, etc.
- Affichage sur le frontend via appel indirect (proxy Next.js).

#### 📁 API Proxy Next.js – POST  
**Position : `FrontEnd/api/secure-proxy/add/route.ts`**
- Transmet les données du formulaire vers l’API PHP.
- Sert de couche d’abstraction entre le frontend et la logique PHP.

#### 📁 API Proxy Next.js – GET  
**Position : `FrontEnd/api/secure-proxy/get/`**
- Appels intermédiaires vers les scripts PHP.
- Cache la logique serveur PHP et améliore la sécurité interne.

---

### 🔄 Traitements communs

- **Correspondance des noms aux identifiants en base** :
  - Conversion automatique (`category` → `category_id`, etc.).
  - Gestion des erreurs de correspondance.

- **Génération automatique de QR codes** :
  - Généré pour chaque matériel à l’aide de `phpqrcode`.
  - Enregistrement en local au format `.png`.

- **Réponse JSON standardisée** :
  - Toutes les API renvoient un format unifié (`success`, `message`, `data`…).

---

## ⚙️ Contraintes techniques

- 🔹 Liaison d'un **serveur local** ↔️ **Dashboard** (Frontend)
- 🔹 Frontend et Backend stockés et exécutés **localement sur le même serveur**
- 🔹 **Aucune sécurisation réseau requise**
  ➡️ Usage strictement local, aucune exposition publique des API.

---

## 🧰 Technologies utilisées

### Frontend
- **Next.js** (React)
- **TypeScript** *(optionnel)*
- **React Hook Form**
- **Tailwind CSS**

### Backend
- **PHP** (procédural)
- **MariaDB**
- **PDO** pour les requêtes SQL
- **phpqrcode** (QR code)

### Divers
- **JSON** pour l'échange de données
- **Git & GitHub Desktop** – versionning
- **Postman** *(tests des méthodes POST)*

---

## 🚧 Prochaines étapes de développement

- 🔐 Authentification des utilisateurs (avec rôles)
- 📊 Dashboard de suivi des matériels disponibles/empruntés
- 📁 Historique complet des emprunts/retours
- 🔎 Recherche et filtrage intelligent dans la base

