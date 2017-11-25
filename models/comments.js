const model = require('../models');

module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define('comments', {
        body: DataTypes.TEXT
    });

    Comments.createComment = (commentedFrom, session, commentDetails) => {
        return Comments.create({
            body: commentDetails.comment,
            userId: session.uuid.id,
            postId: commentedFrom
        })
    }

    return Comments;
}
