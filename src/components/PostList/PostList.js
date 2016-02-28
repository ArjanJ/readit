import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../../actions/PostListActions';
import PostListStore from '../../stores/PostListStore';
import PostListItem from '../PostListItem/PostListItem';
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

		if (params.subreddit) {
			obj.url = `/r/${params.subreddit}/`;
		} else {
			obj.url = '/';
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