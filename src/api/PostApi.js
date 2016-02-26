import Utils from './Utils';

const PostApi = {
	get: () => {
		let url = 'https://www.reddit.com/.json';

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

export default PostApi;