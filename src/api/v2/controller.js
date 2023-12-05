// controller.js
const accountServices = require('../../services/account');
const searchServices = require('../../services/searchService');

Hi = function (req,res){
  res.status(200).send("Hi, welcome to TP noté !")
}

baseShow = async function  baseShow(req, res) {
  const message = await accountServices.baseShow();
  res.send(message);
}

addUser = async function addUser(req,res){
  console.log("je suis dans controlleur !")
  const {name,email,password} = req.body;
  try{
  newUser = await accountServices.createUser(name,email,password);
  res.status(200).json(newUser);
  } catch(error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
  
}

baseDepartementShow = async function baseDepartementShow(req,res){
  console.log("je suis dans le controlleur de la recherche par departement ..")
  try{
  const message = await searchServices.displayBase();
  res.status(200).json(message);
  } catch (error){
    console.error('Error showing depminiBase',error);
    res.status(500).json({error:'Server Error'});
  }
}

searchHouse = async function searchHouse(req,res){
  console.log("Controlleur de la recherche de maison entrain d'exécution ...");
  idUser = req.user
  const {codePostal,GES,DPE,surface_req,surfaceMin_req,surfaceMax_req} = req.body;
  try{
    searchResult = await searchServices.searchByInfos(idUser,codePostal,GES,DPE,surface_req,surfaceMin_req,surfaceMax_req);
    res.status(200).json(searchResult);
  } catch(error){
    console.error('Error during researching ...',error);
    res.status(500).json({error:'Server Error'});
  }
}

showSearchsByUser = async function showSearchsByUser(req,res){
  console.log("Controlleur d'affichage des anciens recherches");
  idUser = req.user;
  try{
    historySearchs = await searchServices.showSearchsDoneByUser(idUser);
    res.status(200).json(historySearchs);
  } catch(error){
    console.error('Error showing the history of searchs ...',error);
    res.status(500).json({error:'Server Error'});
  }
}


retrySearch = async function retrySearch(req,res){
  console.log("Controlleur de relancement d'une recherche ...;");
  idUser = req.user;
  const {idSearch} = req.body;
  try{
    retrySearchResult = await searchServices.retrySearch(idUser,idSearch);
    res.status(200).json(retrySearchResult);
  } catch(error){
    console.error('Error retrying a search ...',error);
    res.status(500).json({error:'Server Error'});
  }
}
deleteSearch = async function deleteSearch(req,res){
  console.log("Controlleur de supprission d'une recherche ...");
  idUser = req.user;
  try{
    const {idSearch} = req.body;
    const result = await searchServices.deleteSearchById(idUser,idSearch);
    res.status(200).json(result);
  }catch(error){
    console.error('Error during deleting search ...',error);
    res.status(500).json({error:'Server Error'});
  }

}

module.exports = {
  Hi,
  baseShow,
  addUser,
  baseDepartementShow,
  searchHouse,
  showSearchsByUser,
  retrySearch,
  deleteSearch
};
