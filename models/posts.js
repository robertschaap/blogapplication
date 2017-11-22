module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        title: DataTypes.TEXT,
        body: DataTypes.TEXT,
        image: DataTypes.TEXT,
        tags: DataTypes.TEXT,
        likes: DataTypes.TEXT,
        category: DataTypes.TEXT
    });
    return Posts;
}
