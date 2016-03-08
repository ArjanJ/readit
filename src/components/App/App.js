import React from 'react';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';

class App extends React.Component {

	render() {

		return (
			<div className="App">
				<div className="App__content">
					<Login />
					{this.props.children}
				</div>
				<div className="App__aside">
					<Menu />
				</div>
			</div>
		)
	}
};

export default App;