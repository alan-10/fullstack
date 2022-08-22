const { getPostByPostIdRepositories, deletePostRepositories } = require("../../../repositories");
const { handleError } =  require("../../../../shared/errors/handleError")


const deletePostService = async ({
    post_id
}) => {

    const {
        posts = []
    } = await getPostByPostIdRepositories({
        post_id
    });

    const has_post = Array.isArray(posts) && posts.length > 0;

    if(!has_post){
        handleError("Hasn't post to delete", 404)
    }

    const [post_to_delete] = posts;

    await deletePostRepositories({
        post_id: post_to_delete.id
    })

    
}

module.exports = {
    deletePostService
}