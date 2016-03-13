import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import ThreadActions from '../../actions/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';
import CommentList from '../CommentList/CommentList';
import Filters from '../Filters/Filters';
import utils  from '../../utils/utils';


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
			obj.url = `/r/${params.subreddit}/comments/${params.id}/${params.title}/.json?sort=${params.filter.toLowerCase()}`;
		} else if (params.subreddit && params.title && params.id) {
			obj.url = `/r/${params.subreddit}/comments/${params.id}/${params.title}/.json`;
		} else {
			console.error('CommentList params undefined.');
		}

		return obj;
	}

	threadSelfText() {
		if (this.state.post.selftext) {
			return (
				<div className="Thread__self-text">
					<ReactMarkdown source={this.state.post.selftext} />
				</div>
			)
		} else {
			return false;
		}
	}

	render() {
		let threadClassName = 'Thread';
		
		if (this.state.loading) threadClassName += ' Thread--loading';

		return (
			<section className={threadClassName}>
				<article className="Thread__wrapper">
					<div className="Thread__headings">
						<h1 className="Thread__title">{this.state.post.title}</h1>
						<h2 className="Thread__subtitle">
							<Link to={`/r/${this.state.post.subreddit}`}>{this.state.post.subreddit}</Link>
						</h2>
					</div>
					<div className="Thread__meta-info">
						<p className="Thread__author">Posted by <strong>{this.state.post.author}</strong> <time datetime={this.state.post.created_utc}>{utils.timeAgo(this.state.post.created_utc)}</time></p>
					</div>
					{this.threadSelfText()}
					<Filters className="Thread__filters" subreddit={`${this.props.params.subreddit}/comments/${this.props.params.id}/${this.props.params.title}`} type="thread" />
				</article>
				<CommentList comments={this.state.comments} />
			</section>
		)
	}
}

export default Thread;