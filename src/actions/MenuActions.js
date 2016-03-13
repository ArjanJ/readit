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

	toggleMenu() {

		// Nothing is needed to be returned here because the Menu is toggled
		// with a boolean which gets toggled in the MenuStore
		// upon the setState method.
		return true;
	}
}

export default alt.createActions(PostListActions);