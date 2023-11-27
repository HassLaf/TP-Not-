const { default : mongoose} = require ("mongoose")

const userSchema = new mongoose.Schema({
    "name": String,
    "email":String,
    "salt": String,
    "Hashedpassword": String,
});

const userModel = mongoose.model('Hass-users',userSchema);
module.exports=userModel;