import utils from './utils';

const api = {

	getData: (params) => {
		let url;

		if (params.url) {
			url = `https://www.reddit.com${params.url}`;
		} else {
			url = 'https://www.reddit.com/';
		}

		let request = new Request(url, {
			method: 'GET'
		});

		return new Promise((resolve, response) => {
			fetch(request)
				.then(utils.checkStatus)
				.then(utils.parseJSON)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.error(error);
					
					if (typeof params !== 'object') {
						console.error(`getData accepts an object literal only, not a ${typeof params}`);
					}

					resolve(null);
				});
		});
	}
}

export default api;