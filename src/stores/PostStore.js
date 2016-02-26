import alt from '../alt';
import PostActions from '../actions/PostActions';

class PostStore {

	constructor() {
		this.bindActions(PostActions);
		this.state = {
			loading: true,
			posts: {}		}
	}

	fetchPosts() {
		this.setState({ loading: true });
	}

	fetchPostsSuccess(response) {
		let posts = response.data.children;

		this.setState({
			loading: false,
			posts: posts 
		});
	}

	fetchPostsFailed(response) {
		console.log(response);
	}
}

export default alt.createStore(PostStore, 'PostStore');