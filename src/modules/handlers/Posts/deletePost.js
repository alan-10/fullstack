'use strict'

const httpStatusCodes = require('http-status-codes');
const { httpErrorHandler } = require("../../common/handlers");
const { deletePostService } = require('../../services');

const deletePostHandler = async (req, res, next) => {
    try {

        const {
            post_id
        } = req.query;

        await deletePostService({
            post_id
        })

        return res.status(httpStatusCodes.NO_CONTENT).send()
    } catch (error) {
        return httpErrorHandler({ req, res, error })
    }
}

module.exports = {
    deletePostHandler
}