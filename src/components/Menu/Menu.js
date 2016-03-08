import React from 'react';
import { Link } from 'react-router';
import MenuActions from '../../actions/MenuActions';
import MenuStore from '../../stores/MenuStore';
import SubredditSearch from '../SubredditSearch/SubredditSearch';

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
			<div>
				<SubredditSearch />
				<nav className="Menu">
					<Link key={0} to={'/'} className="Menu__link">Front</Link>
					<Link key={1} to={'/r/All'} className="Menu__link">All</Link>
					{Object.keys(menu).map((key) => {
						return (
							<Link key={menu[key].data.id} to={`/r/${menu[key].data.display_name}`} className="Menu__link">{menu[key].data.display_name}</Link>
						)
					})}
				</nav>
			</div>
		)
	}
}

export default Menu;