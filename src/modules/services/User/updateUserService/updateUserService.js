const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { getUserRepositories, updateUserRepositories } = require("../../../repositories");
const { handleError } = require("../../../../shared/errors/handleError")

const updateUserService = async ({
    id,
    user_email,
    user_password,
    full_name
}) => {

    const {
        users = []
    } = await getUserRepositories({
        user_id: id
    });

    const has_user = Array.isArray(users) && users.length > 0;

    if (!has_user) {
        handleError("Missing user in database", 404)
    }


    const crypt_password = bcrypt.hashSync(user_password, salt);

    await updateUserRepositories({
        id,
        user_email,
        user_password: crypt_password,
        full_name
    })

    return {
        updatedUser: {
            id,
            user_email,
            full_name
        }
    };
}

module.exports = {
    updateUserService
}