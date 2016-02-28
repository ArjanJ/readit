import alt from '../alt';
import ThreadActions from '../actions/ThreadActions';

class ThreadStore {

	constructor() {
		this.bindActions(ThreadActions);
		this.state = {
			loading: true,
			comments: {},
			post: {}		
		}
	}

	fetchComments() {
		this.setState({ loading: true });
	}

	fetchCommentsSuccess(response) {
		const responsePost = response[0].data.children[0].data;
		const responseComments = response[1].data.children;

		this.setState({
			loading: false,
			comments: responseComments,
			post: responsePost
		});
	}

	fetchCommentsFailed(response) {
		console.log(response);
	}
}

export default alt.createStore(ThreadStore, 'ThreadStore');