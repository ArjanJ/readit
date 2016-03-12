import React from 'react';

class Hamburger extends React.Component {

	toggleSidebar() {
		let sidebar = document.querySelector('.App__aside');
		if (sidebar) sidebar.classList.toggle('App__aside--active');
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