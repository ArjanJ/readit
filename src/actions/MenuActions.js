import alt from '../alt';
import api from '../api/api';

class PostListActions {

	fetchMenu() {

		return (dispatch) => {
			dispatch();

			return new Promise((resolve, response) => {
				api.getData({ url: '/subreddits/default/.json' })
					.then((response) => {
						response !== null ? this.fetchMenuSuccess(response) : this.fetchMenuFailed(response);
						resolve(response);
					});
			});
		}
	}

	fetchMenuSuccess(response) {
		return response;
	}

	fetchMenuFailed(response) {
		return response;
	}

	toggleMenu(toggle) {

		// Returns a boolean, if true open the menu, if false close it.
		return toggle;
	}
}

export default alt.createActions(PostListActions);