import React from 'react';
import { Link } from 'react-router';

class Filters extends React.Component {

	determineFilters(type) {
		let threadFilters = ['best', 'controversial', 'new', 'old', 'top'];
		let postListFilters = ['controversial', 'hot', 'new', 'rising', 'top'];

		if (type === 'thread') {
			return threadFilters;
		} else if (type === 'postList') {
			return postListFilters;
		}
	}

	render() {
		const ACTIVE = { background: 'tomato' };
		
		return (
			<div className="Filter">
				{this.determineFilters(this.props.type).map((filter, i) => {
					return <Link key={i} to={`/r/${this.props.subreddit}/${filter}`} activeStyle={ACTIVE} className="button">{filter}</Link>
				})}
			</div>
		)
	}
}

export default Filters;