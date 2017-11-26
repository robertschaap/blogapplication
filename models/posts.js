const model = require('../models');

module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define('posts', {
        title: DataTypes.TEXT,
        body: DataTypes.TEXT,
        tags: DataTypes.TEXT,
        likes: DataTypes.TEXT,
        category: DataTypes.TEXT
    });

    Posts.allPosts = (category) => {
        if (category === 'All Posts') {
            return Posts.findAll({
                order: [[ 'createdAt', 'desc']],
                include: [ model.Users ]
            })
        } else {
            return Posts.findAll({
                where: { category: category },
                order: [[ 'createdAt', 'desc']],
                include: [ model.Users ]
            })
        }
    }
    Posts.onePost = (id) => {
        return Promise.all([
            Posts.findOne({
                where: { id },
                include: [ model.Users ]
            }),
            model.Comments.findAll({
                where: { postId: id },
                include: [ model.Users ]
            })
        ]);
    }

    Posts.createPost = (session, postDetails) => {
        return Posts.create({
            title: postDetails.title,
            body: postDetails.body,
            tags: postDetails.tags,
            category: postDetails.category,
            userId: session.uuid.id
        })
    }

    return Posts;
}
