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

    Users.createUser = (signupDetails) => {
        return bcrypt.hash(signupDetails.password, 8).then((hash) => {
            return Users.create({
                firstName: signupDetails.firstName,
                lastName: signupDetails.lastName,
                email: signupDetails.email,
                userName: signupDetails.userName,
                bio: signupDetails.bio,
                password: hash,
                passphrase: signupDetails.passphrase,
                passresponse: signupDetails.passresponse
            })
        });
    }

    Users.checkPassword = (password, hash) => {
        return bcrypt.compare(password, hash).then((res) => {
            return res
        })
    }

    Users.loginUser = (userName, password) => {
        return Users.findOne({
            where: { userName }
        }).then((result) => {

            return Users.checkPassword(password, result.dataValues.password).then((res) => {
                if (res) {
                    return result
                } else {
                    return res
                }
            })
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

    return Users;
}
