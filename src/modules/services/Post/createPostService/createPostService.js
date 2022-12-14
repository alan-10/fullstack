const { getUserByIdService } = require("../../User/getUserByIdService/getUserByIdService");
const { createPostRepositories } = require("../../../repositories");
const { handleError } = require("../../../../shared/errors/handleError")

const createPostService = async (post) => {

    const {
        author_id
    } = post;

    const {
        user
    } = await getUserByIdService({
        user_id: author_id
    })

    const has_author = Array.isArray(user) && user.length > 0;

    if (has_author === false) {
        handleError("Hasn't author in database", 400)
    }

    const {
        post_created
    } = await createPostRepositories({
        post
    });

    const has_post_created = Array.isArray(post_created) && post_created.length > 0;

    if (has_post_created === false) {
        return {
            post_created_id: []
        }
    }

    return {
        post_created_id: post_created
    };
}

module.exports = {
    createPostService
}