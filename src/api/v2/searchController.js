// searchController.js
const searchServices = require('../../services/searchService');

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
    searchHouse,
    showSearchsByUser,
    retrySearch,
    deleteSearch
  };