import React from 'react';
import Menu from '../Menu/Menu';
import PostList from '../PostList/PostList';

class App extends React.Component {

	getPostListParams() {
		let params = {};

		if (this.props.params.subreddit) {
			params.subreddit = `/r/${this.props.params.subreddit}/`;
		} else {
			params.subreddit = '/';
		}

		return params;
	}

	getHeading() {
		return this.props.params.subreddit ? this.props.params.subreddit : 'Front Page';
	}

	render() {

		return (
			<div>
				<Menu />
				<h1>{this.getHeading()}</h1>
				<PostList subreddit={this.getPostListParams()} />
			</div>
		)
	}
};

export default App;