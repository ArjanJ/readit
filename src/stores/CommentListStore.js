import alt from '../alt';
import CommentListActions from '../actions/CommentListActions';

class CommentListStore {

	constructor() {
		this.bindActions(CommentListActions);
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

export default alt.createStore(CommentListStore, 'CommentListStore');