import alt from '../alt';
import CommentListApi from '../api/CommentListApi';

class CommentListActions {

	fetchComments(postPermalink) {

		return new Promise((resolve, response) => {
			CommentListApi.get(postPermalink)
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

export default alt.createActions(CommentListActions);