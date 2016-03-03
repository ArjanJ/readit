import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../../actions/PostListActions';
import PostListStore from '../../stores/PostListStore';
import PostListItem from '../PostListItem/PostListItem';
import PostListNav from '../PostListNav/PostListNav';
import Filters from '../Filters/Filters';

class PostList extends React.Component {

	constructor(props) {
		super(props);
		this.state = PostListStore.getState();
	}

	componentDidMount() {
		PostListStore.listen(this.onChange.bind(this));
		PostListActions.fetchPosts(this.getPostListParams(this.props.params));
	}

	componentWillUnmount() {
		PostListStore.unlisten(this.onChange.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		PostListActions.fetchPosts(this.getPostListParams(nextProps.params));
	}

	onChange(state) {
		this.setState(state);
	}

	getPostListParams(params) {
		let obj = {};

		if (params.subreddit && params.filter && params.duration) {
			obj.url = `/r/${params.subreddit}/${params.filter.toLowerCase()}/.json?sort=top&t=${params.duration.toLowerCase()}`;
		} else if (params.subreddit && params.filter) {
			obj.url = `/r/${params.subreddit}/${params.filter.toLowerCase()}/.json`;
		} else if (params.subreddit) {
			obj.url = `/r/${params.subreddit}/.json`;
		} else if (params.filter) {
			obj.url = `/${params.filter.toLowerCase()}/.json`;
		} else {
			obj.url = '/.json';
		}

		return obj;
	}

	getPostListHeading() {
		return this.props.params.subreddit ? this.props.params.subreddit : 'Reddit';
	}

	render() {
		let posts = this.state.posts;

		return (
			<section className="PostList">
				<div className="PostList__wrapper">
					<h1 className="PostList__heading">
						<Link to={this.props.params.subreddit ? `/r/${this.props.params.subreddit}` : '/'}>{this.getPostListHeading()}</Link>
					</h1>
					<Filters className="PostList__filters" type="postList" subreddit={this.props.params.subreddit} />
					<ul className="PostList__list">
						{Object.keys(posts).map((key) => {
							return <PostListItem key={key} item={posts[key]} />
						})}
					</ul>
					<PostListNav subreddit={this.props.params.subreddit} after={posts[posts.length-1]} before={posts[0]} />
				</div>
			</section>
		)
	}
}

export default PostList;