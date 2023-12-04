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
  const {codePostal,GES,DPE,surface_req} = req.body;
  try{
    searchResult = await searchServices.searchByInfos(codePostal,GES,DPE,surface_req);
    res.status(200).json(searchResult);
  } catch(error){
    console.error('Error during researching ...',error);
    res.status(500).json({error:'Server Error'});
  }
}



module.exports = {
  Hi,
  baseShow,
  addUser,
  baseDepartementShow,
  searchHouse
};
