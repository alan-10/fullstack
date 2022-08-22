const { getUserRepositories, deleteUserRepositories } = require("../../../repositories");
const { handleError } = require("../../../../shared/errors/handleError")

const deleteUserService = async ({
    user_id
}) => {

    const {
        users = []
    } = await getUserRepositories({
        user_id
    });

    const has_user = Array.isArray(users) && users.length === 1;

    if(!has_user){
        handleError("No user to delete", 404)
    }

    const [user_to_delete] = users;

    await deleteUserRepositories({
        user_id: user_to_delete.id
    })

    return {
        deletedUser: user_to_delete
    };
}

module.exports = {
    deleteUserService
}