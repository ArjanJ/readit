'use strict';

const express         = require('express');
const session        	= require('client-sessions');
const request 				= require('request');
const cookieParser		= require('cookie-parser');
const path            = require('path');
const passport        = require('passport');
const crypto          = require('crypto');
const RedditStrategy  = require('passport-reddit').Strategy;

const isDeveloping    = process.env.NODE_ENV !== 'production';
let creds;
if (isDeveloping) {
	creds = require('./creds');
}

const REDDIT_CONSUMER_KEY     = isDeveloping ? creds.key : process.env.REDDIT_CONSUMER_KEY;
const REDDIT_CONSUMER_SECRET  = isDeveloping ? creds.secret : process.env.REDDIT_CONSUMER_SECRET;
const REDDIT_CALLBACK_URL = isDeveloping ? 'http://localhost:8080' : 'https://fierce-fortress-81623.herokuapp.com';

const port = isDeveloping ? 8080 : process.env.PORT;

const app = express();


app.use(session({
	cookieName: 'session',
  secret: 'fsafa907352jkdqw89',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new RedditStrategy({
	clientID: REDDIT_CONSUMER_KEY,
	clientSecret: REDDIT_CONSUMER_SECRET,
	callbackURL: REDDIT_CALLBACK_URL + "/auth/reddit/callback"
}, function(accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		return done(null, profile);
	});
}));

app.get('/auth/reddit', function(req, res, next){
	req.session.state = crypto.randomBytes(32).toString('hex');
	passport.authenticate('reddit', {
		state: req.session.state,
	})(req, res, next);
});

app.get('/auth/reddit/callback', function(req, res, next) {
	if (req.query.state == req.session.state) {
		passport.authenticate('reddit', {
			successRedirect: '/',
			failureRedirect: '/login'
		})(req, res, next);
	} else {
		next( new Error(403) );
	}
});

app.get('/logout', function(req, res) {
	if (req.session) {
    req.session.reset();
    res.clearCookie('username');
  }
	req.logout();
	res.redirect('/');
});

app.get('/', function(req, res) {

	if (req.user && !(req.session.user)) {
		req.session.user = req.user.name;
		res.cookie('username', req.user.name, {
			maxAge: 30 * 60 * 1000
		});
	}

	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

if (!(isDeveloping)) {
	app.use(express.static(__dirname + '/dist'));
	app.get('*', function response(req, res) {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});	
}

if (isDeveloping) {
	const webpack 							= require('webpack');
	const webpackMiddleware 		= require('webpack-dev-middleware');
	const webpackHotMiddleware 	= require('webpack-hot-middleware');
	const config 								= require('./webpack.config.dev.js');
	const compiler 							= webpack(config);

	const middleware = webpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: 'src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get('*', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
		res.end();
	});
}

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/');
}

app.listen(port, '0.0.0.0', function onStart(err) {
	if (err) {
		console.log(err);
	}
	console.info('==>  Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});