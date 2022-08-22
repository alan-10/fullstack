const { getPostByPostIdRepositories,updatePostRepositories } = require("../../../repositories");
const { getUserByIdService } = require("../../User/getUserByIdService/getUserByIdService");
const { handleError } = require("../../../../shared/errors/handleError")


  const updatePostService = async ({
    id,
    author_id,
    post_text
  }) => {
  
    const {
        posts = []
    } = await getPostByPostIdRepositories({
        post_id: id
    });
  
  
    const has_post = Array.isArray(posts) && posts.length > 0;
  
    if (!has_post) {
        handleError("Hasn't post to update", 400)
    }
  
    const {
        user
    } = await getUserByIdService({
        user_id: author_id
    })

    const has_author = Array.isArray(user) && user.length > 0;
    
    if(has_author === false) {
        handleError("Hasn't author in database to update", 400)
    }


    await updatePostRepositories({
        id,
        author_id,
        post_text
    })
  
    return {
        updatedpost: {
            id,
            author_id,
            post_text
        }
    };
  }
  
  module.exports = {
    updatePostService
  }