import React from 'react';
import PostActions from '../../actions/PostActions';
import PostStore from '../../stores/PostStore';

class App extends React.Component {

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
		let posts = this.state.posts;

		return (
			<section>
				<h1>Readit</h1>
				<ul>
					{Object.keys(posts).map((key) => {
						return (
							<li key={posts[key].data.id}>
								{posts[key].data.title}
							</li>
						)
					})}
			</ul>
			</section>
		)
	}
};

export default App;