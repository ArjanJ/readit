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

	componentWillUpdate(nextProps, nextState) {
		let aside = document.querySelector('.App__aside');
		let asideActiveClassName = 'App__aside--active';

		nextState.active ? aside.classList.add(asideActiveClassName) : aside.classList.remove(asideActiveClassName);
	}

	onChange(state) {
		this.setState(state);
	}

	onLinkClick() {
		MenuActions.toggleMenu(false);
	}

	render() {
		let menu = this.state.menu;

		return (
			<div>
				<SubredditSearch />
				<nav className="Menu">
					<Link key={0} to={'/'} onClick={this.onLinkClick.bind(this)} className="Menu__link">Front</Link>
					<Link key={1} to={'/r/All'} onClick={this.onLinkClick.bind(this)}  className="Menu__link">All</Link>
					{Object.keys(menu).map((key) => {
						return (
							<Link key={menu[key].data.id} to={`/r/${menu[key].data.display_name}`} onClick={this.onLinkClick.bind(this)}  className="Menu__link">{menu[key].data.display_name}</Link>
						)
					})}
				</nav>
			</div>
		)
	}
}

export default Menu;