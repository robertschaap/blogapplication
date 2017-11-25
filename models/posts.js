const model = require('../models');

module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define('posts', {
        title: DataTypes.TEXT,
        body: DataTypes.TEXT,
        image: DataTypes.TEXT,
        tags: DataTypes.TEXT,
        likes: DataTypes.TEXT,
        category: DataTypes.TEXT
    });

    Posts.allPosts = () => {
        return Posts.findAll({
            order: [[ 'createdAt', 'desc']],
            include: [ model.Users ]
        })
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
            image: postDetails.image,
            tags: postDetails.tags,
            category: postDetails.category,
            userId: session.uuid.id
        })
    }

    return Posts;
}
