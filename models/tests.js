const model = require('../models');

module.exports = ( sequelize ) => {
    sequelize.sync({ force: true }).then(() => {
        model.Users.createUser({
            firstName: 'Robert',
            lastName: 'Schaap',
            email: 'robert.schaap@mac.com',
            userName: 'RobertSchaap',
            bio: 'I do stuff with Nodejs and mostly stare at error messages',
            password: 'robertschaap' })
        .then((output) => {
            output.createPost({
                title: 'Why CSS is not your worst nightmare',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
                tags: 'blank',
                category: 'Design'
            })
            .then( () => {
                model.Comments.create({ body: 'Great post, you really get the subject matter', userId: 1, postId: 1})
            })
            output.createPost({
                title: 'All about CSS Grid',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
                tags: 'blank',
                category: 'Technology'
            })
            output.createPost({
                title: 'The strange property called Sticky',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
                tags: 'blank',
                category: 'Design'
            })
            .then( () => {
                model.Comments.create({ body: 'Great post, you really get the subject matter', userId: 1, postId: 1})
            })
            output.createPost({
                title: 'Align Middle is missing and it\'s a problem',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
                tags: 'blank',
                category: 'Entrepreneur'
            })
        })

        model.Users.createUser({
            firstName: 'David',
            lastName: 'White',
            email: 'david.white@gmail.com',
            userName: 'DavidWhite',
            bio: 'I was cloned to resemble somone else',
            password: 'davidwhite' })
        .then((output) => {
            output.createPost({
                title: 'How I learned to love Floats',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
                tags: 'blank',
                category: 'Design'
            })
            .then( () => {
                model.Comments.create({ body: 'Comment Body', userId: 2, postId: 2})
            })
            output.createPost({
                title: 'Corporate Ipsum and 20 Other Amazing Ipsums',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a est auctor dolor tincidunt bibendum eget a arcu. Mauris pellentesque vitae ligula hendrerit efficitur. Maecenas eget eleifend lorem, a ultricies ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis est metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat dignissim nunc. Curabitur blandit quam nulla, quis fermentum metus pulvinar sit amet.',
                tags: 'blank',
                category: 'Technology'
            })
        })
    });
}
