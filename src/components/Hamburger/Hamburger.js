import React from 'react';
import MenuActions from '../../actions/MenuActions';

class Hamburger extends React.Component {

	toggleSidebar() {
		MenuActions.toggleMenu();
	}

	render() {
		
		return (
			<button onClick={this.toggleSidebar.bind(this)} type="button" className="Hamburger">
				<span className="Hamburger__patty"></span>
				<span className="Hamburger__patty"></span>
				<span className="Hamburger__patty"></span>
			</button>
		)
	}
};

export default Hamburger;