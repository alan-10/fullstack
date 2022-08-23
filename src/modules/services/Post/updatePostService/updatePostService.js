const { getPostByPostIdRepositories,updatePostRepositories , getUserRepositories} = require("../../../repositories");
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
        users 
    } = await getUserRepositories({
        user_id:author_id
    });


    const has_author = Array.isArray(users) && users.length > 0;
    
    if(!has_author) {
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