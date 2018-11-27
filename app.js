// Declarations
const express = require('express');
const app = express();
const myport = process.env.PORT || 3000;

// Dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Models & Session Store
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const model = require('./models');

app.use(session({
  store: new SequelizeStore({
    db: model.sequelize,
    checkExpirationInterval: 15 * 60000,
    expiration: 60 * 60000
  }),
  secret: '38-38-40-40-37-39-37-39-66-65-13',
  saveUninitialized: false,
  resave: false,
}));

// Check If Session
app.use((req, res, next) => {
  if (req.session.uuid) {
    res.locals.uuid = true;
    next();
  } else {
    next();
  }
});

// Views
app.set('view engine', 'pug');
app.use(express.static('public'));

// Controllers
app.use(require('./controllers'));

app.listen(myport, () =>
  console.log(`Now listening on port ${myport}`)
);
