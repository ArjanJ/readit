import React from 'react';
import CommentListActions from '../../actions/CommentListActions';
import CommentListStore from '../../stores/CommentListStore';
import CommentListItem from '../CommentListItem/CommentListItem';
import './CommentList.scss';

class CommentList extends React.Component {

	constructor(props) {
		super(props);
		this.state = CommentListStore.getState();
	}

	componentDidMount() {
		CommentListStore.listen(this.onChange.bind(this));
		CommentListActions.fetchComments(this.props.post);
	}

	componentWillUnmount() {
		CommentListStore.unlisten(this.onChange.bind(this));
	}

	onChange(state) {
		this.setState(state);
	}

	createCommentList(comments) {
		return (
			<ul>
				{Object.keys(comments).map((key) => {
					let item = comments[key];
					let replies = item.data.replies;
					return (
						<CommentListItem key={key} text={item.data.body} replies={replies} />
					)
				})}
			</ul>
		)
	}

	render() {

		return (
			<section>
				<h1 className="u-heading-4">{this.state.post.title}</h1>
				<p>{this.state.post.selftext}</p>
				{this.createCommentList(this.state.comments)}
			</section>
		)
	}
}

export default CommentList;