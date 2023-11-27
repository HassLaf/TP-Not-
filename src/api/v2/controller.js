// controller.js
const accountServices = require('../../services/account');

baseShow = async function  baseShow(req, res) {
  const message = await accountServices.baseShow();
  res.send(message);
}
Hi = function (req,res){
  res.status(200).send("Hi, welcome to TP noté !")
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
// async function userShow(req,res){
//   const message = await pokemonBaseData.afficherUser();
//   console.log(message);
//   res.send(message);
// }


module.exports = {
  baseShow,
  addUser,
  Hi
};
