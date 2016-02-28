import alt from '../alt';
import PostApi from '../api/PostApi';

class PostListActions {

	fetchPosts(subreddit) {

		return new Promise((resolve, response) => {
			PostApi.get(subreddit)
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