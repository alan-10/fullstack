const { 
    client
} = require('../../../common/handlers')


const getUserRepositories = async ({
    user_id
} = {}) => {
    
    const response = await client('users').where({ id: user_id })

    return {
        users: response
    }
}

module.exports = {
    getUserRepositories
}