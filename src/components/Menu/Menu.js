import React from 'react';
import { Link } from 'react-router';
import MenuActions from '../../actions/MenuActions';
import MenuStore from '../../stores/MenuStore';

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = MenuStore.getState();
	}

	componentDidMount() {
		MenuStore.listen(this.onChange.bind(this));
		MenuActions.fetchMenu();
	}

	componentWillUnmount() {
		MenuStore.unlisten(this.onChange.bind(this));
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let menu = this.state.menu;

		return (
			<nav className="menu">
				{Object.keys(menu).map((key) => {
					return (
						<Link key={menu[key].data.id} to={`/r/${menu[key].data.display_name}`}>{menu[key].data.display_name}</Link>
					)
				})}
			</nav>
		)
	}
}

export default Menu;