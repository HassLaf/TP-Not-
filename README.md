Pour Tester :
  Il y a un fichier .envExemple qui contient l'ensemble des variables d'envirenement à définir :
    PORT= le porte auxquels vous souhaitez lancer votre serveur.
    DATABASE_URL= l'url de notre base de données (dans notre cas c'est : mongodb+srv://student:ensim@clusterdpe.dly181i.mongodb.net/dpe?retryWrites=true&w=majority)
    API_SEARCH_DATA = URL de l'API de nominatim que vous souhaitez intérogger (Dans notre cas c'est : https://nominatim.openstreetmap.org/search?)
    ACCESS_TOKEN_SECRET= "tonSercret"
    REFRESH_TOKEN_SECRET="tonRefreshSecret"


LES Fonctionallités mis en place :
- DECOUPAGE --- OK
- les APIs minimales : OK
    - créer des utilisateurs --- OK
    - Login -> tokens(acces et refresh) ---- OK
    - REFRESH ---- OK
    - RECHERCHE DPE (plusieurs critéres:codePostale,DPE,GES,surface exacte,surface par intervalle) ---- OK
    - Affichage de l'historique des recherches d'un utilisateur ---- OK
    - Suppression d'une recherche par ID ----- OK
    - Relancer une recherche ----- OK
- Utilisation de JWT sans pwd ---- OK
- TESTS unitaires -------- en cours
- couille / Var Names ---- OK
- Mock ----- Pas encore


# TP-Not-
