import utils from './utils';

const api = {

	getData: (params) => {
		let url;

		if (params.url) {
			url = `https://www.reddit.com${params.url}.json`;
		} else {
			url = 'https://www.reddit.com/.json';
		}

		return new Promise((resolve, response) => {
			fetch(url)
				.then(utils.checkStatus)
				.then(utils.parseJSON)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log('request failed', error);
				});
		});
	}
}

export default api;