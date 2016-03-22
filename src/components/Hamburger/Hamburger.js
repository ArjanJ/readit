import React from 'react';
import MenuActions from '../../actions/MenuActions';

class Hamburger extends React.Component {

	toggleSidebar() {
		let aside = document.querySelector('.App__aside');
		let asideActiveClassName = 'App__aside--active';

		let toggle = aside.classList.contains(asideActiveClassName) ? false : true;

		 MenuActions.toggleMenu(toggle);
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