import React from 'react';
import ThreadActions from '../../actions/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';
import CommentList from '../CommentList/CommentList';
import Filters from '../Filters/Filters';


class Thread extends React.Component {

	constructor(props) {
		super(props);
		this.state = ThreadStore.getState();
	}

	componentDidMount() {
		ThreadStore.listen(this.onChange.bind(this));
		ThreadActions.fetchComments(this.getCommentListParams(this.props.params));
	}

	componentWillUnmount() {
		ThreadStore.unlisten(this.onChange.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		ThreadActions.fetchComments(this.getCommentListParams(nextProps.params));
	}

	onChange(state) {
		this.setState(state);
	}

	getCommentListParams(params) {
		let obj = {};

		if (params.subreddit && params.title && params.id && params.filter) {
			obj.url = `/r/${params.subreddit}/comments/${params.id}/${params.title}/.json?sort=${params.filter}`;
		} else if (params.subreddit && params.title && params.id) {
			obj.url = `/r/${params.subreddit}/comments/${params.id}/${params.title}/.json`;
		} else {
			console.error('CommentList params undefined.');
		}

		return obj;
	}

	render() {

		return (
			<section className="Thread">
				<h1 className="Thread__title u-heading-4">{this.state.post.title}</h1>
				<Filters subreddit={`${this.props.params.subreddit}/comments/${this.props.params.id}/${this.props.params.title}`} type="thread" />
				<CommentList comments={this.state.comments} />
			</section>
		)
	}
}

export default Thread;