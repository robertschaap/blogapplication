const model = require('../models');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('users', {
        firstName: DataTypes.TEXT,
        lastName: DataTypes.TEXT,
        email: { type: DataTypes.TEXT, unique: true},
        userName: { type: DataTypes.TEXT, unique: true},
        bio: DataTypes.TEXT,
        password: DataTypes.TEXT,
        passphrase: DataTypes.TEXT,
        passresponse: DataTypes.TEXT,
        likedposts: DataTypes.TEXT,
        bookmarks: DataTypes.TEXT
    });

    Users.checkUserExists = (userName) => {
        return Users.findOne({
            where: { userName }
        })
    }

    Users.profileUser = (id) => {
        return Users.findOne({
            where: { id },
            include: [ model.Posts ]
        }).then((result) => {
            let profileInfo = {
                profile: result.dataValues,
                posts: result.dataValues.posts.map(i => i.dataValues)
            }
            return profileInfo;
        })
    }

    Users.loginUser = (userName, password) => {
        return Users.findOne({
            where: { userName }
        }).then((result) => {
            if ( result && password === result.password) {
                return result
            }
        })
     }

    Users.createUser = (signupDetails) => {
        return Users.create({
            firstName: signupDetails.firstname,
            lastName: signupDetails.lastname,
            email: signupDetails.email,
            userName: signupDetails.username,
            bio: signupDetails.bio,
            password: signupDetails.password,
            passphrase: signupDetails.resetquestion,
            passresponse: signupDetails.resetanswer
        })
    }

    return Users;
}
