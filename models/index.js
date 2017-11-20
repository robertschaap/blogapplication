const Sequelize = require('sequelize');
const sequelize = new Sequelize('blogapp', process.env.POSTGRES_USER, null, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    // logging: false
});

// Model Definitions
const Users = sequelize.define('users', {
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
    email: { type: Sequelize.TEXT, unique: true},
    userName: { type: Sequelize.TEXT, unique: true},
    bio: Sequelize.TEXT,
    avatar: Sequelize.TEXT,
    password: Sequelize.TEXT,
    passphrase: Sequelize.TEXT,
    passresponse: Sequelize.TEXT,
    likedposts: Sequelize.TEXT,
    likedcomments: Sequelize.TEXT,
    bookmarks: Sequelize.TEXT
});
const Posts = sequelize.define('posts', {
    title: Sequelize.TEXT,
    body: Sequelize.TEXT,
    image: Sequelize.TEXT,
    tags: Sequelize.TEXT,
    likes: Sequelize.TEXT,
    category: Sequelize.TEXT
});
const Comments = sequelize.define('comments', {
    body: Sequelize.TEXT,
    likes: Sequelize.TEXT
});

// Relation Definitions

Users.hasMany(Posts);
Posts.belongsTo(Users);

Comments.belongsTo(Users);
Comments.belongsTo(Posts);

// Sync (Dummy data creates one user with one post with one comment)
sequelize.sync({ force: true }).then(() => {
    Users.create({
        firstName: 'Robert',
        lastName: 'Schaap',
        email: 'robert.schaap@mac.com',
        userName: 'RobertSchaap',
        bio: 'bio',
        avatar: 'avatar',
        password: '0000',
        passphrase: 'phrase',
        passresponse: 'response',
        likedposts: 'blank',
        likedcomments: 'blank',
        bookmarks: 'blank' })
    .then(output => {
        output.createPost({
            title: 'Post 1 Title',
            body: 'Post Body',
            image: 'blank',
            tags: 'blank',
            likes: 'blank',
            category: 'blank' })
        .then( () => {
            Comments.create({ body: 'Comment Body', likes: 'blank', userId: 1, postId: 1})
        })
    })

    Users.create({
        firstName: 'Roberto',
        lastName: 'Schapino',
        email: 'roberto.schapino@mac.com',
        userName: 'RobertoSchapino',
        bio: 'bio',
        avatar: 'avatar',
        password: '0000',
        passphrase: 'phrase',
        passresponse: 'response',
        likedposts: 'blank',
        likedcomments: 'blank',
        bookmarks: 'blank' })
    .then(output => {
        output.createPost({
            title: 'Post 1 Title',
            body: 'Post Body',
            image: 'blank',
            tags: 'blank',
            likes: 'blank',
            category: 'blank' })
        .then( () => {
            Comments.create({ body: 'Comment Body', likes: 'blank', userId: 2, postId: 2})
        })
    })

});

// Functions

// Exports
