const depModel = require("../models/depminiShema");
const usersSearchModel = require("../models/usersSearchShema");

const axios = require('axios');

 displayBase = async function (){
    const  allData = await depModel.find();
    return allData;
}

searchByInfos = async function (userId,codePostal,label_GES,label_DPE,surface,surfaceMin,surfaceMax){
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
        
        if (typeof surface === 'number') {
            query["Surface_habitable_logement"] = surface;
        }
        // Sinon, si surfaceMin et surfaceMax sont définis, recherchez une plage de valeurs
        else if (surfaceMin !== undefined && surfaceMax !== undefined) {
            query["Surface_habitable_logement"] = {
                $gte: surfaceMin,  // Greater than or equal to min
                $lte: surfaceMax   // Less than or equal to max
            };
        }
        const filteredData = await depModel.find(query);
        console.log(filteredData);
        // Array to store the results with coordinates
        const resultsWithCoordinates = [];
        
        // Loop through each element in filteredData
        for (const element of filteredData) {
            // Construct the address string for Nominatim
            const address = `${element["Adresse_(BAN)"]}, ${element["Code_postal_(BAN)"]}, France`;
            console.log(address);

            // Make a request to Nominatim for coordinates
            const nominatimResponse = await axios.get(process.env.API_SEARCH_DATA, {
                params: {
                    q: address,
                    format: 'json',
                }
            });
            //console.log(nominatimResponse.data);
            // Extract latitude and longitude from the Nominatim response
            console.log(nominatimResponse.data[0])
            // Check if coordinates are found in the response
            if (nominatimResponse.data && nominatimResponse.data.length > 0) {
                // Extract latitude and longitude from the Nominatim response
                const latitude = nominatimResponse.data[0].lat;
                const longitude = nominatimResponse.data[0].lon;

                // Add the coordinates to the element and push it to resultsWithCoordinates
                const elementWithCoordinates = { ...element.toObject(), latitude, longitude };
                resultsWithCoordinates.push(elementWithCoordinates);
            } else {
                // Coordinates not found, add element with undefined latitude and longitude
                const elementWithUndefinedCoordinates = { ...element.toObject(), latitude: undefined, longitude: undefined };
                resultsWithCoordinates.push(elementWithUndefinedCoordinates);
            }

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

// Supprimer une recherche par son ID
deleteSearchById = async function deleteSearchById(userId, searchId) {
    try {
        // Vérifier si l'utilisateur a le droit de supprimer la recherche
        const searchToDelete = await userSearchModel.findOne({ _id: searchId, id_User: userId });

        if (!searchToDelete) {
            console.log('La recherche n\'a pas été trouvée ou vous n\'avez pas les droits pour la supprimer.');
            return { success: false, message: 'Recherche non trouvée ou droits insuffisants.' };
        }

        // Supprimer la recherche
        const result = await userSearchModel.deleteOne({ _id: searchId });

        if (result.deletedCount === 1) {
            console.log('La recherche a été supprimée avec succès.');
            return { success: true, message: 'Recherche supprimée avec succès.' };
        } else {
            console.log('Aucune recherche n\'a été supprimée ou une erreur s\'est produite.');
            return { success: false, message: 'Erreur lors de la suppression de la recherche.' };
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la recherche :', error);
        throw error;
    }
}



module.exports ={
    displayBase,
    searchByInfos,
    deleteSearchById
}