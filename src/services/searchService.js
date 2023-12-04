const depModel = require("../models/depminiShema");

 displayBase = async function (){
    const  allData = await depModel.find();
    return allData;
}

searchByInfos = async function (codePostal,label_GES,label_DPE,surface){
    // filtredData = await depModel.filter(function(house){
    
    //     conditionCodePostal = !codePostal || house.Code_postal === codePostal;
    //     condition_GES = !label_GES || house.Etiquette_GES == label_GES;
    //     condition_DPE = !label_DPE || house.Etiquette_DPE == label_DPE;
        
        
    //     return conditionCodePostal && condition_GES && condition_DPE;
    //   })
    //   return filtredData;
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

        console.log(query);
        const filteredData = await depModel.find(query);
        console.log(filteredData);
        return filteredData;
    } catch (error) {
        console.error('Error during searching ...', error);
        return { error: 'Internal Server Error' };
    }
    }




module.exports ={
    displayBase,
    searchByInfos
}