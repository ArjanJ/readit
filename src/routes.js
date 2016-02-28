import React from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import App from './components/App/App';
import Post from './components/Post/Post';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App} />
		<Route path="/r/:subreddit" component={App} />
		<Route path="/r/:subreddit/comments/:id/:title" component={Post} />
	</Router>
)

export default routes;