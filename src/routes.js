import React from 'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './components/App/App';
import PostList from './components/PostList/PostList';
import Thread from './components/Thread/Thread';

const routes = (
	<Router history={browserHistory}>
		<Route path="/(:filter)" component={App}>
			<IndexRoute component={PostList} />
			<Route path="/r/:subreddit(/:filter(/:duration))" component={PostList} />
			<Route path="/r/:subreddit/comments/:id/:title(/:filter)" component={Thread} />
		</Route>
	</Router>
)

export default routes;