import React from 'react';
import { browserHistory } from 'react-router';
import MenuActions from '../../actions/MenuActions';


class SubredditSearch extends React.Component {

	goToSubreddit(event) {
		event.preventDefault();
		
		let subreddit = this.refs.subreddit.value;

		if (subreddit) browserHistory.push(`/r/${subreddit}`);

		this.refs.subredditSearchForm.reset();

		MenuActions.toggleMenu(false);
	}

	render() {

		return(
			<form className="SubredditSearch" ref="subredditSearchForm" onSubmit={this.goToSubreddit.bind(this)}>
				<span>r/</span>
				<input type="text" ref="subreddit" className="SubredditSearch__input" placeholder="subreddit" />
			</form>
		)
	}
}

export default SubredditSearch;