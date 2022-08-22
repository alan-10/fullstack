const { getUserByIdService } = require("../../User/getUserByIdService/getUserByIdService");
const { getPostByUserIdRepositories, getAllPostsRepositories } = require("../../../repositories");
const { handleError } = require('../../../../shared/errors/handleError')

const getPostByUserIdService = async ({
    user_id
}) => {

    const has_user_id = !!user_id && Number.isFinite(+user_id);

    if (!has_user_id) {
        const { posts } = await getAllPostsRepositories();

        return {
            posts
        }
    }


    const {
        user
    } = await getUserByIdService({
        user_id
    });

    const has_author = Array.isArray(user) && user.length > 0;

    if (has_author === false) {
        handleError("Missing author in database", 404)
    }

    const posts = await getPostByUserIdRepositories({
        user_id
    });

    return {
        posts
    };

}

module.exports = {
    getPostByUserIdService
}