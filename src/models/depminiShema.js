const { default : mongoose} = require ("mongoose")

const depSchema = new mongoose.Schema({
        "N°_département_(BAN)": Number,
        "Date_réception_DPE": Date,
        "Date_établissement_DPE": Date,
        "Date_visite_diagnostiqueur": Date,
        "Etiquette_GES": String,
        "Etiquette_DPE": String,
        "Année_construction": Number,
        "Surface_habitable_logement": Number,
        "Adresse_(BAN)": String,
        "Code_postal_(BAN)": Number
});

const depModel = mongoose.model('depmini72',depSchema);
module.exports=depModel;