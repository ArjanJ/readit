import React from 'react';

class CommentListItem extends React.Component {

	createReplyList(comments) {
		if (comments && comments.data.children) {
			let replies = comments.data.children;

			return (
				<ul className="CommentListItem__replies">
					{Object.keys(replies).map((key) => {
						if (replies[key].kind === 't1') {
							return <CommentListItem key={key} text={replies[key].data.body} replies={replies[key].data.replies} />
						}
					})}
				</ul>
			)
		}
	}

	render() {

		return (
			<li className="CommentListItem">
				<span className="CommentListItem__text">{this.props.text}</span>
				{this.createReplyList(this.props.replies)}
			</li>
		)
	}
}

export default CommentListItem;