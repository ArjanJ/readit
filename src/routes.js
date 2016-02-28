import React from 'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './components/App/App';
import PostList from './components/PostList/PostList';
import Thread from './components/Thread/Thread';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={PostList} />
			<Route path="r/:subreddit" component={PostList} />
			<Route path="r/:subreddit/comments/:id/:title" component={Thread} />
		</Route>
	</Router>
)

export default routes;