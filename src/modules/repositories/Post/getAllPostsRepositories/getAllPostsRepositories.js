const { 
  client
} = require('../../../common/handlers')

const getAllPostsRepositories = async ()  => {

  const response = await client('posts');

  const has_posts = Array.isArray(response) && response.length > 0;

  if(!has_posts){
    return {
      posts: []
    }
  }

  return {
    posts: response
  }

}

module.exports = {
  getAllPostsRepositories
}