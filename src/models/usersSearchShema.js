const { default : mongoose, models} = require ("mongoose");

 
const usersSearchShema = new mongoose.Schema({
    "id_User" : String, // l'utilisateur qui a effectué la recherche.
    "result": Object, 
    "parameters": {
        "Etiquette_DPE" : String,
        "Etiquette_GES" : String,
        "Code_postal_(BAN)" : Number,
        "Surface_habitable_logement": Number
    }
})

userSearchModel = mongoose.model("Hass-userSearchShema",usersSearchShema);

module.exports = userSearchModel;

