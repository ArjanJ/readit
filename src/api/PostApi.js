function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

const PostApi = {
	get: () => {
		let url = 'https://www.reddit.com/.json';

		return new Promise((resolve, response) => {
			fetch(url)
				.then(checkStatus)
				.then(parseJSON)
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