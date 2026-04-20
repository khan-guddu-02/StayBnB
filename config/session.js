const MongoStore = require("connect-mongo");

const Url =process.env.ATLASDB_URL //"mongodb://localhost:27017/wanderlust"; 

const store = MongoStore.create({
  mongoUrl: Url,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

module.exports = sessionOption;