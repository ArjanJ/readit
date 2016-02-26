import Utils from './Utils';

const MenuApi = {
	get: () => {
		let url = 'https://www.reddit.com/subreddits/default.json';

		return new Promise((resolve, response) => {
			fetch(url)
				.then(Utils.checkStatus)
				.then(Utils.parseJSON)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log('request failed', error);
				});
		});
	}
}

export default MenuApi;