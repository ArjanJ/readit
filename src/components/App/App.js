import React from 'react';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import Hamburger from '../Hamburger/Hamburger';

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
				<Hamburger />
			</div>
		)
	}
};

export default App;