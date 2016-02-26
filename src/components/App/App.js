import React from 'react';
import Menu from '../Menu/Menu';
import PostList from '../PostList/PostList';

class App extends React.Component {

	render() {

		return (
			<div>
				<Menu />
				<PostList />
			</div>
		)
	}
};

export default App;