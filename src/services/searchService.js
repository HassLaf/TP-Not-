const depModel = require("../models/depminiShema");
const usersSearchModel = require("../models/usersSearchShema");

const axios = require('axios');

 displayBase = async function (){
    const  allData = await depModel.find();
    return allData;
}

searchByInfos = async function (userId,codePostal,label_GES,label_DPE,surface){
    try {
        let query = {};

        if (codePostal) {
            query["Code_postal_(BAN)"] = codePostal;
        }

        if (label_GES) {
            query["Etiquette_GES"] = label_GES;
        }

        if (label_DPE) {
            query["Etiquette_DPE"] = label_DPE;
        }

        if (surface) {
            query["Surface_habitable_logement"] = surface;
        }
        
        const filteredData = await depModel.find(query);
        console.log(filteredData);
        // Array to store the results with coordinates
        const resultsWithCoordinates = [];
        
        // Loop through each element in filteredData
        for (const element of filteredData) {
            // Construct the address string for Nominatim
            const address = `${element["Adresse_(BAN)"]}, ${element["Code_postal_(BAN)"]}, France`;
            //console.log(address);
            // Make a request to Nominatim for coordinates
            const nominatimResponse = await axios.get(process.env.API_SEARCH_DATA, {
                params: {
                    q: address,
                    format: 'json',
                }
            });
            //console.log(nominatimResponse.data);
            // Extract latitude and longitude from the Nominatim response
            const latitude = nominatimResponse.data[0].lat;
            const longitude = nominatimResponse.data[0].lon;

            // Add the coordinates to the element and push it to resultsWithCoordinates
            const elementWithCoordinates = { ...element.toObject(), latitude, longitude };
            resultsWithCoordinates.push(elementWithCoordinates);
        }
        console.log(resultsWithCoordinates);
        
        // Enregistrez les informations de recherche avec l'ID de l'utilisateur
        const userSearchData = new userSearchModel({
            id_User: userId,
            result: resultsWithCoordinates,
            parameters: {
            "Etiquette_DPE": label_DPE,
            "Etiquette_GES": label_GES,
            'Code_postal_(BAN)': codePostal,
            "Surface_habitable_logement": surface,
            },
        });

        await userSearchData.save();
        return resultsWithCoordinates;



    } catch (error) {
        console.error('Error during searching ...', error);
        return { error: 'Internal Server Error' };
    }
}  




module.exports ={
    displayBase,
    searchByInfos
}