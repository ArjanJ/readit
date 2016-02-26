import alt from '../alt';
import MenuApi from '../api/MenuApi';

class PostActions {

	fetchMenu() {

		return new Promise((resolve, response) => {
			MenuApi.get()
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

export default alt.createActions(PostActions);