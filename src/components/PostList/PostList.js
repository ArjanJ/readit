import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../../actions/PostListActions';
import PostListStore from '../../stores/PostListStore';
import PostListItem from '../PostListItem/PostListItem';
import Filters from '../Filters/Filters';
import './PostList.scss';

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
			obj.url = `/r/${params.subreddit}/${params.filter}/.json?sort=top&t=${params.duration}`;
		} else if (params.subreddit && params.filter) {
			obj.url = `/r/${params.subreddit}/${params.filter}/.json`;
		} else if (params.subreddit) {
			obj.url = `/r/${params.subreddit}/.json`;
		} else {
			obj.url = '/.json';
		}

		return obj;
	}

	getPostListHeading() {
		return this.props.params.subreddit ? this.props.params.subreddit : 'Front Page';
	}

	render() {
		let posts = this.state.posts;

		return (
			<section className="PostList">
				<h1 className="PostList__heading">{this.getPostListHeading()}</h1>
				<Filters type="postList" subreddit={this.props.params.subreddit} />
				<ul className="PostList__list">
					{Object.keys(posts).map((key) => {
						return <PostListItem key={key} item={posts[key]} />
					})}
				</ul>
			</section>
		)
	}
}

export default PostList;