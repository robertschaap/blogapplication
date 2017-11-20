# Project Brief

- create a blog that allows users to register, login, logout
- once logged in user should be able to:
    - post
    - view a list of their posts
    - view a list of everyone's posts
    - view a specific post including comments from others
    - leave a comment on a post

## Database

- create a database and keep track of files to create database with.
- provide script for creation of database and csv import of table data.
- try to implement the final version as a mini-app within the portfolio

users
-----
id spk
firstname text
lastname text
e-mail text (validate) unique
username varchar(30) unique
bio varchar(100)
avatar text
password (enc)
passphrase (text)
passresponse (text)
likedposts (json) (postId)
likedcomment (json) (commentId)
bookmarks (json) (postId)

posts
-----
id spk
title
body
image
tags
likes
category
created_at
updated_at
\userId

comments
--------
id spk
likes
created_at
updated_at
\userId
\postId

## Site Design
### Routes
- \
- \users [display all]
- \users\new [create new]
- \users\:id [see one]
- \posts [display all]
- \posts\new [create new]
- \posts\:id [see one]

- \login
- \logout

### Layout & Functionality
- REST, MVC
- Focus on a minimal design
- Sans-serif font for headers, serif for body
- Basic formatting option would be nice for code (i.e. wrap code in a simple code tag
- Start with single page layout, then extract and scale

Individual Post
- Should show header, image, like, suggestions would be cool.

