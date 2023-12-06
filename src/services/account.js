const userModel = require('../models/userShema');
const bcrypt = require ('bcrypt');

createUser = async function createUser(userName,email,newPassword){
    try {
    // Générer un sel (salt)
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Création et sauvegarde d'un utilisateur
    const newUser = new userModel({
        "name": userName,
        "email": email,
        "Hashedpassword": hashedPassword
    });
  
    newUser.save()
    return newUser;
}catch(error){
    console.error('Error adding user:', error);
    return json({ error: 'Server Error' });
}
}


showUsers = async function showUsers(){
    Base = await userBase.find();
    return json(Base);
}

module.exports = {
    createUser,
    showUsers
}