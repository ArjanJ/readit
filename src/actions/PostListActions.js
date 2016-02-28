import alt from '../alt';
import api from '../api/api';

class PostListActions {

	fetchPosts(subreddit) {

		return new Promise((resolve, response) => {
			api.getData(subreddit)
				.then((response) => {
					this.fetchPostsSuccess(response);
					resolve(response);
				});
			});
	}

	fetchPostsSuccess(response) {
		return response;
	}

	fetchPostsFailed(response) {
		return response;
	}
}

export default alt.createActions(PostListActions);