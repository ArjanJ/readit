import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../../actions/PostListActions';
import utils from '../../utils/utils';

class PostListNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			count: {
				before: 0,
				after: 0
			},
			when: 'after'
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextState.when === 'after' && nextState.count.after !== this.state.count.after) {
			this.fetchNewPosts(nextState.count.after, 'after', this.props.after.data.name);
		}

		if (nextState.when === 'before' && nextState.count.before !== this.state.count.before) {
			this.fetchNewPosts(nextState.count.before, 'before', this.props.before.data.name);
		}

		utils.scrollTop('.App__content', 0);
	}

	button(text, onclick) {
		return <button type="button" className="PostListNav__button" onClick={onclick}>{text}</button>
	}

	updateCountNext() {
		let afterCount = this.state.count.after;
		let beforeCount = this.state.count.before;

		afterCount += 25;

		this.setState({
			count: {
				after: afterCount,
				before: beforeCount
			},
			when: 'after'
		});
	}

	updateCountPrev() {
		let afterCount = this.state.count.after;
		let beforeCount = this.state.count.before;

		if (this.state.when === 'before') {
			beforeCount -= 25;
			afterCount -= 25;
		} else {
			beforeCount = afterCount + 1;
		}

		if (beforeCount > 1) {
			this.setState({
				count: {
					after: afterCount,
					before: beforeCount
				},
				when: 'before'
			});
		}
	}

	fetchNewPosts(count, when, postName) {
		let subreddit = this.props.subreddit ? `/r/${this.props.subreddit}/` : '/';
		let url = `${subreddit}.json?count=${count}&${when}=${postName}`;

		PostListActions.fetchPosts({ url: url });
	}

	render() {

		return(
			<div className="PostListNav">
				{this.button('Prev', this.updateCountPrev.bind(this))}
				{this.button('Next', this.updateCountNext.bind(this))}
			</div>
		)
	}
}

export default PostListNav;