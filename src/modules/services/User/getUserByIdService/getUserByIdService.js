const { request } = require("express");
const { getUserRepositories } = require("../../../repositories");
const { handleError } = require("../../../../shared/errors/handleError");

const getUserByIdService = async ({
    user_id
}) => {

    const has_user_id = !!user_id;

    if (!has_user_id) return {
        user: false,
        has_single_user: false
    };

    const {
        users 
    } = await getUserRepositories({
        user_id
    });


    const has_single_user = Array.isArray(users) && users.length > 0;

    if(!has_single_user){
        handleError("Missing user in database", 404);
    }

    return {
        user: users,
        has_single_user
    };
}

module.exports = {
    getUserByIdService
}