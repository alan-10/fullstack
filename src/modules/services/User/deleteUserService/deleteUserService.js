const { getUserRepositories, deleteUserRepositories, getPostByUserIdRepositories } = require("../../../repositories");
const { handleError } = require("../../../../shared/errors/handleError")

const deleteUserService = async ({
    user_id
}) => {

    const {
        users = []
    } = await getUserRepositories({
        user_id
    });

    const {
        posts = []
    } = await 
    getPostByUserIdRepositories({ 
        user_id 
    });

    const has_user = Array.isArray(users) && users.length === 1;

    const has_user_in_posts = Array.isArray(posts) && posts.length >  0;

    if(!has_user){
        handleError("No user to delete", 404)
    }

    if(has_user_in_posts){
        handleError("cannot delete user who is assigned in posts", 409)
    }

    const [user_to_delete] = users;

    await deleteUserRepositories({
        user_id: user_to_delete.id
    })

}

module.exports = {
    deleteUserService
}