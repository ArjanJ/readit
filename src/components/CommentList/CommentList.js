import React from 'react';
import ThreadActions from '../../actions/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';
import CommentListItem from '../CommentListItem/CommentListItem';
import utils from '../../utils/utils';

class CommentList extends React.Component {

	componentDidMount() {
		utils.scrollTop('.App__content', 0)
	}

	render() {
		let comments = this.props.comments;

		return (
			<section className="CommentList">
				<div className="CommentList__wrapper">
					<ul className="CommentList__list">
						{Object.keys(comments).map((key) => {
							let item = comments[key];
							let replies = item.data.replies;
							
							return <CommentListItem key={key} item={item} replies={replies} />
						})}
					</ul>
				</div>
			</section>
		)
	}
}

export default CommentList;