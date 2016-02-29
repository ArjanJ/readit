import alt from '../alt';
import api from '../api/api';

class PostListActions {

	fetchMenu() {

		return new Promise((resolve, response) => {
			api.getData({ url: '/subreddits/default/.json' })
				.then((response) => {
					this.fetchMenuSuccess(response);
					resolve(response);
				});
			});
	}

	fetchMenuSuccess(response) {
		return response;
	}

	fetchMenuFailed(response) {
		return response;
	}
}

export default alt.createActions(PostListActions);