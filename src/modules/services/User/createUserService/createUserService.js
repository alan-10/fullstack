const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { createUserRepositories } = require("../../../repositories");
const { handleError } =  require("../../../../shared/errors/handleError");

const createUserService = async (user) => {

    const crypt_password = bcrypt.hashSync(user.user_password, salt);

     if(
        user.user_password.trim() === ''
        || user.user_email.trim() === ''
     ){
        handleError("user_password and user_email are required", 400)
     }

    const {
        user_created
    } = await createUserRepositories({
        user:{
            ...user,
            user_password: crypt_password
        }
    });

    const has_user_created = Array.isArray(user_created) && user_created.length > 0;

    if(has_user_created === false){
        return {
            user_created_id: []
        }
    }

    return {
        user_created_id: user_created
    };
}

module.exports = {
    createUserService
}