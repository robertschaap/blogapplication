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

// Relation Definitions
Users.hasMany(Posts);
Posts.belongsTo(Users);

Comments.belongsTo(Users);

Posts.hasMany(Comments);
Comments.belongsTo(Posts);

// Functions
function makeMap(obj) {
    return obj.map(i => i.dataValues);
}

// Exports
exports.sequelize = sequelize;

exports.allPosts = () => {
    return Posts.findAll({
        order: [[ 'createdAt', 'desc']],
        include: [ Users ]
    }).then(makeMap);
}
exports.onePost = (id) => {
    return Promise.all([

        Posts.findOne({
            where: { id },
            include: [ Users ]
        }),
        Comments.findAll({
            where: { postId: id },
            include: [ Users ]
        })
    ]);
}
exports.createPost = (session, postDetails) => {
    return Posts.create({
        title: postDetails.title,
        body: postDetails.body,
        image: postDetails.image,
        tags: postDetails.tags,
        category: postDetails.category,
        userId: session.uuid.id
    })
}

exports.createComment = (commentedFrom, session, commentDetails) => {
    return Comments.create({
        body: commentDetails.comment,
        userId: session.uuid.id,
        postId: commentedFrom
    })
}

exports.allUsers = () => {
    return Users.findAll().then(makeMap);
}
exports.oneUser = (id) => {
    return Users.findOne({
        where: { id },
        include: [ Posts ]
    })
}
exports.checkUser = (userName) => {
    return Users.findOne({
        where: { userName: userName }
    })
}
exports.createUser = (signupDetails) => {
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

// Sync (Dummy data creates one user with one post with one comment)
sequelize.sync({ force: true }).then(() => {
    Users.create({
        firstName: 'Robert',
        lastName: 'Schaap',
        email: 'robert.schaap@mac.com',
        userName: 'RobertSchaap',
        bio: 'I do stuff with Nodejs and mostly stare at error messages',
        avatar: 'avatar',
        password: 'robertschaap',
        passphrase: 'phrase',
        passresponse: 'response' })
    .then(output => {
        output.createPost({
            title: 'Why CSS is not your worst nightmare',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
            image: 'blank',
            tags: 'blank',
            category: 'blank'
        })
        .then( () => {
            Comments.create({ body: 'Comment Body', userId: 1, postId: 1})
        })
        output.createPost({
            title: 'All about CSS Grid',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
            image: 'blank',
            tags: 'blank',
            category: 'blank'
        })
        output.createPost({
            title: 'The strange property called Sticky',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
            image: 'blank',
            tags: 'blank',
            category: 'blank'
        })
        output.createPost({
            title: 'Align Middle is missing and it\'s a problem',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
            image: 'blank',
            tags: 'blank',
            category: 'blank'
        })
    })

    Users.create({
        firstName: 'David',
        lastName: 'White',
        email: 'david.white@activision.com',
        userName: 'RobertoSchapino',
        bio: 'I was cloned to resemble somone else',
        avatar: 'avatar',
        password: 'davidwhite',
        passphrase: 'phrase',
        passresponse: 'response' })
    .then(output => {
        output.createPost({
            title: 'How I learned to love Floats',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
            image: 'blank',
            tags: 'blank',
            category: 'blank'
        })
        .then( () => {
            Comments.create({ body: 'Comment Body', userId: 2, postId: 2})
        })
        output.createPost({
            title: 'Corporate Ipsum and 20 Other Amazing Ipsums',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
            image: 'blank',
            tags: 'blank',
            category: 'blank'
        })
    })
});
