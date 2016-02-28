import React from 'react';
import { Link } from 'react-router';
import MenuActions from '../../actions/MenuActions';
import MenuStore from '../../stores/MenuStore';
import PostListActions from '../../actions/PostListActions';
import './Menu.scss';

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

	linkClick(url) {
		let params = {subreddit: url};
		PostListActions.fetchPosts(params);
	}

	render() {
		let menu = this.state.menu;
		
		return (
			<nav className="menu">
				<Link onClick={this.linkClick.bind(this, '')} key={0} to={'/'}>Front</Link>
				<Link onClick={this.linkClick.bind(this, '/r/all')} key={1} to={'/r/All'}>All</Link>
				{Object.keys(menu).map((key) => {
					return (
						<Link onClick={this.linkClick.bind(this, menu[key].data.url)} key={menu[key].data.id} to={`/r/${menu[key].data.display_name}`}>{menu[key].data.display_name}</Link>
					)
				})}
			</nav>
		)
	}
}

export default Menu;