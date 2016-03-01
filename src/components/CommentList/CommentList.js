import React from 'react';
import ThreadActions from '../../actions/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';
import CommentListItem from '../CommentListItem/CommentListItem';

class CommentList extends React.Component {

	render() {
		let comments = this.props.comments;

		return (
			<section className="CommentList">
				<ul className="CommentList__list">
					{Object.keys(comments).map((key) => {
						let item = comments[key];
						let replies = item.data.replies;
						
						return <CommentListItem key={key} text={item.data.body} replies={replies} />
					})}
				</ul>
			</section>
		)
	}
}

export default CommentList;