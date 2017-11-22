module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comments', {
        body: DataTypes.TEXT
    });
    return Comments;
}
