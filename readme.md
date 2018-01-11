# Title
A blog application where users can signup, post and read as well as comment on posts.

##### Technologies
HTML5 | CSS3 | JavaScript | Node.js | Express | Pug | PostgreSQL | Sequelize    
Express-Session | Connect-Session-Sequelize | Body-Parser | BCrypt | Validatejs

### Scope
##### What it was designed to do
+ Use REST routing with query parameters
+ Use a more traditional version of the MVC architecture
    * Controllers and routes are in the controller folder. These have purposely been designed to be relatively light. The controller itself does not actually speak to the database.
    * View contains all views
    * Models are in the models folder with relations and connections being set in the index.js file, the models themselves are set in separate files together with any attached methods.
+ Sessions are managed, the default session will expire unless the 'Remember Me' checkbox is ticked.

##### What it wasn't designed to do
- Updating/editing. This can be built in but the focus of the project was more on the routing and the actual posting/reading.

### Installation Notes
Please feel free to download or clone the repository. Modules are all included in the package.json however you will need to have either PostgreSQL installed or make modifications if you're using a different dialect. This can be done in models/index.js. The tests.js file in the same folder will auto-populate a number of posts. Just make sure you have a database called 'blogapp' in place. A text avatar and post banner have been included in the main folder.
