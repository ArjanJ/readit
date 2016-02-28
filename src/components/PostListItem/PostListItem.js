import React from 'react';
import { Link } from 'react-router';

class PostListItem extends React.Component {

	render() {
		let item = this.props.item;

		return (
			<li key={item.data.id} className="PostList__item">
				<Link to={item.data.permalink}>{item.data.title}</Link>
			</li>
		)
	}
}

export default PostListItem;