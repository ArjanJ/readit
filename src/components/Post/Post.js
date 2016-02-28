import React from 'react';
import Menu from '../Menu/Menu';
import CommentList from '../CommentList/CommentList';

class Post extends React.Component {

	getCommentListParams() {
		let params = {};
		let pp = this.props.params;

		if (pp.subreddit && pp.title && pp.id) {
			params.post = `/r/${pp.subreddit}/comments/${pp.id}/${pp.title}`;
		}

		return params;
	}

	render() {
		
		return (
			<div>
				<Menu />
				<CommentList post={this.getCommentListParams()} />
			</div>
		)
	}
}

export default Post;