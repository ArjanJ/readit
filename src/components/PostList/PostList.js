import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../../actions/PostListActions';
import PostListStore from '../../stores/PostListStore';
import PostListItem from '../PostListItem/PostListItem';
import PostListNav from '../PostListNav/PostListNav';
import Filters from '../Filters/Filters';
import utils from '../../utils/utils';

class PostList extends React.Component {

	constructor(props) {
		super(props);
		this.state = PostListStore.getState();
	}

	componentDidMount() {
		PostListStore.listen(this.onChange.bind(this));
		PostListActions.fetchPosts(this.getPostListParams(this.props.params));

		// Set page title
		let title = utils.toTitleCase(this.props.params.subreddit);
		document.title = title ? `${title} - Readit` : 'Readit - A Reddit Reader';
	}

	componentWillUnmount() {
		PostListStore.unlisten(this.onChange.bind(this));
	}

	componentWillReceiveProps(nextProps) {

		// Fetch new posts
		PostListActions.fetchPosts(this.getPostListParams(nextProps.params));

		// Scroll to top of the page
		utils.scrollTop('.App__content', 0);

		// Set page title
		let title = utils.toTitleCase(nextProps.params.subreddit);
		document.title = title ? `${title} - Readit` : 'Readit - A Reddit Reader';
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

	postListElement(posts) {
		return (
			<ul className="PostList__list">
				{Object.keys(posts).map((key) => {
					return <PostListItem key={key} item={posts[key]} />
				})}
			</ul>
		)
	}

	noPostsElement() {
		return (
			<div>
				<h2>Sorry, we couldn't find anything here!</h2>
				<p>Either that subreddit doesn't exist or Reddit's servers are busy right now. Please refresh the page in a minute.</p>
			</div>
		)
	}

	render() {
		let posts = this.state.posts;

		let postListClassName = 'PostList';
		
		if (this.state.loading) postListClassName += ' PostList--loading';

		return (
			<section className={postListClassName}>
				<div className="PostList__wrapper">
					<h1 className="PostList__heading">
						<Link to={this.props.params.subreddit ? `/r/${this.props.params.subreddit}` : '/'}>{this.getPostListHeading()}</Link>
					</h1>
					<Filters className="PostList__filters" type="postList" subreddit={this.props.params.subreddit} />

					{ this.state.posts ? this.postListElement(this.state.posts) : this.noPostsElement() }

					{this.state.posts ? <PostListNav subreddit={this.props.params.subreddit} after={posts && posts[posts.length-1]} before={posts && posts[0]} /> : null}
				</div>
			</section>
		)
	}
}

export default PostList;