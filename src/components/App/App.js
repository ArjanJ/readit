import React from 'react';
import Menu from '../Menu/Menu';

class App extends React.Component {

	render() {

		return (
			<div className="App">
				<div className="App__content">
					{this.props.children}
				</div>
				<Menu />
			</div>
		)
	}
};

export default App;