====================================================
  ROYALTIME — Mini Site E-commerce de Montres de Luxe
  README
====================================================

----------------------------------------------------
  DESCRIPTION DU SITE
----------------------------------------------------

RoyalTime est un mini site e-commerce spécialisé dans
la vente de montres de luxe. Il propose une expérience
utilisateur haut de gamme avec un design sobre et élégant
inspiré des grandes maisons horlogères.

Le site permet de :
  - Parcourir une collection de montres par catégorie
  - Rechercher des montres par mot-clé
  - Consulter la fiche détaillée de chaque montre
  - Créer un compte et se connecter
  - Gérer une wishlist (favoris)
  - Ajouter des montres au panier
  - Simuler un paiement en ligne
  - Contacter le service client

----------------------------------------------------
  PAGES DU SITE
----------------------------------------------------

  index.html          → Page d'accueil
  content/
    categorie2.html   → Catalogue & filtrage par catégorie
    fiche.html        → Fiche produit détaillée
    barre.html        → Recherche de montres
    contact.html      → Formulaire de contact
    login.html        → Connexion utilisateur
    signup.html       → Inscription utilisateur
    logout.html       → Déconnexion
    wishlist.html     → Liste de souhaits
    panier.html       → Panier d'achat
    paiment.html      → Page de paiement

----------------------------------------------------
  INSTRUCTIONS D'UTILISATION
----------------------------------------------------

1. Ouvrir index.html dans un navigateur moderne
   (Chrome, Firefox, Edge, Safari).

2. Navigation :
   - Cliquer sur "Catégories" pour filtrer les montres
   - Cliquer sur une montre pour voir sa fiche détaillée
   - Utiliser la loupe pour rechercher par mot-clé
     (exemples : "homme", "sport", "classique")

3. Compte utilisateur :
   - Cliquer sur "Connexion" pour se connecter
   - Identifiants de test fournis :
       Email    : admin@royaltime.com
       Mot de passe : Admin123!
   - Ou créer un nouveau compte via "S'inscrire"

4. Panier :
   - Sur la fiche produit, cliquer "Add to cart"
   - L'icône panier (🛒) affiche le nombre d'articles
   - Accéder au panier pour modifier les quantités
   - Procéder au paiement (simulation côté client)

5. Wishlist :
   - Sauvegarder des montres via le bouton ♡
   - Accéder à la wishlist depuis le menu

6. Toutes les données (utilisateurs, panier, wishlist)
   sont stockées dans le localStorage du navigateur.
   Aucun backend requis.

----------------------------------------------------
  STRUCTURE DES FICHIERS
----------------------------------------------------

RoyalTime/
├── index.html
├── readme.txt
├── content/
│   ├── categorie2.html
│   ├── fiche.html
│   ├── barre.html
│   ├── contact.html
│   ├── login.html
│   ├── signup.html
│   ├── logout.html
│   ├── wishlist.html
│   ├── panier.html
│   └── paiment.html
├── style/
│   ├── style.css
│   ├── categorie.css
│   ├── fiche.css
│   ├── barre.css
│   ├── contact.css
│   ├── login.css
│   ├── signup.css
│   ├── wishlist.css
│   ├── panier.css
│   └── paiment.css
├── javascript/
│   ├── main.js         ← session auth + badges globaux
│   ├── products.js     ← données produits + rendu DOM
│   ├── scripte.js      ← carousels + interactions homepage
│   ├── categoriejs.js  ← filtrage catégories
│   ├── fiche.js        ← galerie + détails produit
│   ├── barrejs.js      ← recherche
│   ├── panier.js       ← gestion panier localStorage
│   ├── wishlist.js     ← gestion wishlist localStorage
│   ├── paiment.js      ← validation formulaire paiement
│   ├── login.js        ← authentification
│   └── signup.js       ← inscription
└── images/
    └── (toutes les images du site)

----------------------------------------------------
  MEMBRES DU GROUPE
----------------------------------------------------

  [Prénom1 NOM1]
  [Prénom2 NOM2]
  [Prénom3 NOM3]
  [Prénom4 NOM4]
  [Prénom5 NOM5]

  Module    : Développement Web
  Année     : 2025 – 2026
  Université: UMMTO — Faculté des Sciences et du Génie

====================================================
