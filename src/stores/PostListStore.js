import alt from '../alt';
import PostListActions from '../actions/PostListActions';

class PostListStore {

	constructor() {
		this.bindActions(PostListActions);
		this.state = {
			loading: true,
			posts: {},
			subreddit: ''
		}
	}

	fetchPosts() {
		this.setState({ loading: true });
	}

	fetchPostsSuccess(response) {
		let posts = response.data.children;

		this.setState({
			loading: false,
			posts: posts,
			subreddit: posts[0].data.subreddit
		});
	}

	fetchPostsFailed(response) {
		
		this.setState({
			loading: false,
			posts: null
		});
	}
}

export default alt.createStore(PostListStore, 'PostListStore');