import React from 'react';
import { Link } from 'react-router';

class Filters extends React.Component {

	determineFilters(type) {
		let threadFilters = ['Best', 'Controversial', 'New', 'Old', 'Top'];
		let postListFilters = ['Hot', 'New', 'Top', 'Rising', 'Controversial'];

		if (type === 'thread') {
			return threadFilters;
		} else if (type === 'postList') {
			return postListFilters;
		}
	}

	filterButtons(filter, key) {
		let to = this.props.subreddit ? `/r/${this.props.subreddit}/${filter}` : `/${filter}`;

		const ACTIVE = { color: '#F44336' };

		return <Link key={key} to={to} activeStyle={ACTIVE} className="Filters__button">{filter}</Link>
	}

	render() {
		
		return (
			<div className="Filters">
				{this.determineFilters(this.props.type).map((filter, i) => {
					return this.filterButtons(filter, i)
				})}
			</div>
		)
	}
}

export default Filters;