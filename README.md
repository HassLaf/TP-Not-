# TP-Note- Readme

## Pour Tester :

1. Copiez le fichier `.envExemple` et renommez-le en `.env`.
2. Définissez les variables d'environnement suivantes dans le fichier `.env` :

    - `PORT`: le port sur lequel vous souhaitez lancer votre serveur.
    - `DATABASE_URL`: l'URL de votre base de données;
    - `API_SEARCH_DATA`: l'URL de l'API Nominatim que vous souhaitez interroger.
    - `ACCESS_TOKEN_SECRET`: "votreSecret".
    - `REFRESH_TOKEN_SECRET`: "votreRefreshSecret".

# Informations complémentaires

Pour tester l'ensemble des fonctionnalités, suivez cet ordre recommandé :

1. **Création d'un utilisateur :**
   - Importez la collection Postman "collection user".
   - Utilisez la requête "POST User_Creation" pour créer un utilisateur.
   - Vérifiez dans la base de données (hass-users), par exemple avec MongoDB Compass, si l'utilisateur est correctement créé.

2. **Connexion :**
   - Utilisez la requête "POST Connexions_Tokens" en fournissant votre adresse e-mail et votre mot de passe dans le corps de la requête.
   - Obtenez un accessToken et un refreshToken en réponse.

3. **Actualisation du Token (RefreshToken) :**
   - Utilisez la requête "POST refreshToken" en passant votre refreshToken en paramètre.
   - Recevez un nouveau accessToken en réponse.

4. **Recherche :**
   - Importez la collection Postman "Search Collection".
   - Utilisez la requête "POST searchRequests" pour effectuer une recherche.
   - Envoyez un fichier JSON contenant les critères de recherche ( codepostal,GES,DPE,surfaceExacte,surfacemin,surfaceMax).
   - Recevez les résultats avec les coordonnées de latitude et longitude.

6. **Historique des Recherches :**
   - Utilisez la requête "POST historySearch" en fournissant votre accessToken.
   - Visualisez l'ensemble de vos recherches effectuées.

7. **Suppression d'une Recherche :**
   - Consultez la base de données (hass-usersearchshemas).
   - Récupérez l'ID d'une recherche effectuée.
   - Utilisez la requête "POST deleteSearchRequest" en fournissant l'ID dans le corps de la requête.

8. **Relance d'une Recherche :**
   - Obtenez l'ID d'une recherche (consultez les paramètres pour le distinguer, généralement la dernière recherche effectuée est en bas).
   - Utilisez l'ID dans le corps de la requête "POST retrySearch".
   - Visualisez les résultats de la recherche relancée.

## Fonctionnalités mises en place :

- **Découpage**: ✔️ OK
- **APIs minimales**:
    - Création d'utilisateurs: ✔️ OK
    - Login -> tokens (accès et rafraîchissement): ✔️ OK
    - Rafraîchissement de token: ✔️ OK
    - Recherche DPE (critères multiples : code postal, DPE, GES, surface exacte, surface par intervalle): ✔️ OK
    - Affichage de l'historique des recherches d'un utilisateur: ✔️ OK
    - Suppression d'une recherche par ID: ✔️ OK
    - Relancer une recherche: ✔️ OK
- Utilisation de JWT sans mot de passe: ✔️ OK
- Tests unitaires: ❌ En cours
- Conventions de nommage des variables: ✔️ OK
- Mock: ❌ Pas encore implémenté
