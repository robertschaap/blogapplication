const model = require('../models');
const bcrypt = require('bcrypt');

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

    Users.allUsers = () => {
        return Users.findAll().then(makeMap);
    }
    Users.oneUser = (id) => {
        return Users.findOne({
            where: { id },
            include: [ Posts ]
        })
    }
    Users.loginUser = (username, password) => {
        return Users.findOne({
            where: { userName: username }
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
            avatar: signupDetails.avatar,
            password: signupDetails.password,
            passphrase: signupDetails.resetquestion,
            passresponse: signupDetails.resetanswer
        })
    }


    return Users;
}
