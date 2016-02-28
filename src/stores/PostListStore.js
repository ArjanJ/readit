import alt from '../alt';
import PostListActions from '../actions/PostListActions';

class PostListStore {

	constructor() {
		this.bindActions(PostListActions);
		this.state = {
			loading: true,
			posts: {}		
		}
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

export default alt.createStore(PostListStore, 'PostListStore');