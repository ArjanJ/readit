import alt from '../alt';
import PostApi from '../api/PostApi';

class PostActions {

	fetchPosts() {

		return new Promise((resolve, response) => {
			PostApi.get()
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

export default alt.createActions(PostActions);