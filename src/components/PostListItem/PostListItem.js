import React from 'react';
import { Link } from 'react-router';

class PostListItem extends React.Component {

	stringContains(string) {

	}

	render() {
		let item = this.props.item;

		return (
			<li key={item.data.id} className="PostList__item">
				<a href={item.data.url.indexOf('reddit.com') > -1 ? `#${item.data.permalink}` : item.data.url} className="PostList__link" target={item.data.url.indexOf('reddit.com') > -1 ? '_self' : '_blank'}>
					<span className="PostList__score">{item.data.score}</span>
					<span className="PostList__link-text">{item.data.title}</span>
				</a>
				<Link to={item.data.permalink} className="PostList__button">View comments</Link>
			</li>
		)
	}
}

export default PostListItem;