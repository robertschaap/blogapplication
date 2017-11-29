const Sequelize = require('sequelize');
const sequelize = new Sequelize('blogapp', process.env.POSTGRES_USER, null, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
});

// Model Definitions
const Users = sequelize.import('./users');
const Comments = sequelize.import('./comments');
const Posts = sequelize.import('./posts');
const Tests = sequelize.import('./tests');

// Relation Definitions
Users.hasMany(Posts);
Posts.belongsTo(Users);

Comments.belongsTo(Users);

Posts.hasMany(Comments);
Comments.belongsTo(Posts);


// Exports
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
exports.Posts = Posts;
exports.Comments = Comments;
exports.Users = Users;
