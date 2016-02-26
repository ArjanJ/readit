import React from 'react';
import PostActions from '../../actions/PostActions';
import PostStore from '../../stores/PostStore';

class PostList extends React.Component {

	constructor(props) {
		super(props);
		this.state = PostStore.getState();
	}

	componentDidMount() {
		PostStore.listen(this.onChange.bind(this));
		PostActions.fetchPosts();
	}

	componentWillUnmount() {
		PostStore.unlisten(this.onChange.bind(this));
	}

	onChange(state) {
		this.setState(state);
	}

	render() {

		return (
			<ul className="PostList">
				{Object.keys(this.state.posts).map((key) => {
					return (
						<li key={this.state.posts[key].data.id}>
							{this.state.posts[key].data.title}
						</li>
					)
				})}
			</ul>
		)
	}
}

export default PostList;