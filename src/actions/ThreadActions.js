import alt from '../alt';
import api from '../api/api';

class ThreadActions {

	fetchComments(postPermalink) {

		return new Promise((resolve, response) => {
			api.getData(postPermalink)
				.then((response) => {
					this.fetchCommentsSuccess(response);
					resolve(response);
				});
		});
	}

	fetchCommentsSuccess(response) {
		return response;
	}

	fetchCommentsFailed(response) {
		return response;
	}
}

export default alt.createActions(ThreadActions);