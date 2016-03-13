import alt from '../alt';
import api from '../api/api';

class PostListActions {

	fetchPosts(subreddit) {

		return (dispatch) => {
			dispatch();

			return new Promise((resolve, response) => {
				api.getData(subreddit)
					.then((response) => {
						response !== null ? this.fetchPostsSuccess(response) : this.fetchPostsFailed(response);
						resolve(response);
						return response;
					});
			});
		}
		
	}

	fetchPostsSuccess(response) {
		return response;
	}

	fetchPostsFailed(response) {
		return response;
	}
}

export default alt.createActions(PostListActions);