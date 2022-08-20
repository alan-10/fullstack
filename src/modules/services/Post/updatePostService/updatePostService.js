const { getPostByPostIdRepositories,updatePostRepositories } = require("../../../repositories");
const { getUserByIdService } = require("../../User/getUserByIdService/getUserByIdService");
  
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
        throw new Error("Hasn't post to update")
    }
  
    const {
        user
    } = await getUserByIdService({
        user_id: author_id
    })

    const has_author = Array.isArray(user) && user.length > 0;
    
    if(has_author === false) {
        throw new Error("Hasn't author in database to update")
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