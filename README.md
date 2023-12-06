TP-Note- Readme
Pour Tester :
Copiez le fichier .envExemple et renommez-le en .env.

Définissez les variables d'environnement suivantes dans le fichier .env :

PORT: le port sur lequel vous souhaitez lancer votre serveur.
DATABASE_URL: l'URL de votre base de données (exemple : mongodb+srv://student:ensim@clusterdpe.dly181i.mongodb.net/dpe?retryWrites=true&w=majority).
API_SEARCH_DATA: l'URL de l'API Nominatim que vous souhaitez interroger (exemple : https://nominatim.openstreetmap.org/search?).
ACCESS_TOKEN_SECRET: "votreSecret".
REFRESH_TOKEN_SECRET: "votreRefreshSecret".
Fonctionnalités mises en place :
Découpage: ✔️ OK
APIs minimales:
Création d'utilisateurs: ✔️ OK
Login -> tokens (accès et rafraîchissement): ✔️ OK
Rafraîchissement de token: ✔️ OK
Recherche DPE (critères multiples : code postal, DPE, GES, surface exacte, surface par intervalle): ✔️ OK
Affichage de l'historique des recherches d'un utilisateur: ✔️ OK
Suppression d'une recherche par ID: ✔️ OK
Relancer une recherche: ✔️ OK
Utilisation de JWT sans mot de passe: ✔️ OK
Tests unitaires: ⚠️ En cours
Conventions de nommage des variables: ✔️ OK
Mock: ❌ Pas encore implémenté
