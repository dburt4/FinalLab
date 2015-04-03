var express = require('express'),
		passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
		cookieParser = require('cookie-parser'),
		bodyParser = require('body-parser'),
		expressSession = require('express-session'),
		mongoStore = require('mongoose'),
		mongoose = require('mongoose');
require('./models/users_models.js');

var app = express();
var conn = mongoose.connect('mongodb://localhost/myapp');
var HOST_NAME = 'www.deastman.me';
var GOOGLE_CLIENT_ID = '332674613994-iiiphkc9vm9iaa56acn7jo8dvdn6f2oa.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = '4vAKZY9jjNHJRlct-adCB4x1';

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new GoogleStrategy({
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://' + HOST_NAME + '/auth/google/return',
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function(err, user) {
			return done(err, user);
    });
  }
));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(cookieParser());
app.use(bodyParser());
app.use(expressSession({
	secret: 'SECRET',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60*60*1000 },
	store: new mongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'sessions'
	})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/static'));

app.get('/login', function(req, res){
  if(req.isAuthenticated()){
    res.redirect('/info');
  } else{
    res.render('login', { user: req.user });
  }
});
app.get('/auth/google',
  passport.authenticate('google',
	{ scope: 'https://www.googleapis.com/auth/plus.login' }));
app.get('/auth/google/return',
  passport.authenticate('google', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/info');
	});
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});
app.get('/info', function(req, res){
  if(req.isAuthenticated()){
    res.render('info', { user: req.user });
  } else {
    res.redirect('/login');
  }
});
//require('./routes')(app);
app.listen(80);
