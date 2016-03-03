import React from 'react';
import utils from '../../utils/utils';

class CommentListItem extends React.Component {

	createReplyList(comments) {
		if (comments && comments.data.children) {
			let replies = comments.data.children;

			return (
				<ul className="CommentListItem__replies">
					{Object.keys(replies).map((key) => {
						if (replies[key].kind === 't1') {
							return <CommentListItem key={key} item={replies[key]} replies={replies[key].data.replies} />
						}
					})}
				</ul>
			)
		}
	}

	render() {

		return (
			<li className="CommentListItem">
				<div className="CommentListItem__meta-info">
					<span className="CommentListItem__author">{this.props.item.data.author}</span> <span className="CommenListItem__time">{utils.timeAgo(this.props.item.data.created_utc)}</span>
				</div>
				<span className="CommentListItem__text">{this.props.item.data.body}</span>
				{this.createReplyList(this.props.replies)}
			</li>
		)
	}
}

export default CommentListItem;