import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../../actions/PostListActions';
import PostListStore from '../../stores/PostListStore';
import './PostList.scss';

class PostList extends React.Component {

	constructor(props) {
		super(props);
		this.state = PostListStore.getState();
	}

	componentDidMount() {
		PostListStore.listen(this.onChange.bind(this));
		PostListActions.fetchPosts(this.props.subreddit);
	}

	componentWillUnmount() {
		PostListStore.unlisten(this.onChange.bind(this));
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let posts = this.state.posts;

		return (
			<ul className="PostList">
				{Object.keys(posts).map((key) => {
					return (
						<li key={posts[key].data.id}>
							<Link to={posts[key].data.permalink}>{posts[key].data.title}</Link>
						</li>
					)
				})}
			</ul>
		)
	}
}

export default PostList;