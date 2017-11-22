module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        firstName: DataTypes.TEXT,
        lastName: DataTypes.TEXT,
        email: { type: DataTypes.TEXT, unique: true},
        userName: { type: DataTypes.TEXT, unique: true},
        bio: DataTypes.TEXT,
        avatar: DataTypes.TEXT,
        password: DataTypes.TEXT,
        passphrase: DataTypes.TEXT,
        passresponse: DataTypes.TEXT,
        likedposts: DataTypes.TEXT,
        bookmarks: DataTypes.TEXT
    });
    return Users;
}
