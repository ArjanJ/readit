import Utils from './Utils';

const CommentListApi = {
	get: (params) => {
		let url;

		if (params.post) {
			url = `https://www.reddit.com${params.post}/.json`;
		} else {
			url = 'https://www.reddit.com/.json';
		}

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

export default CommentListApi;