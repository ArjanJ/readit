import React from 'react';
import cookies from '../../utils/cookies';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			username: ''
		};
	}

	componentDidMount() {
		this.isLoggedIn();
	}

	isLoggedIn() {
		let username = cookies.getItem('username');
		if (username) {
			this.setState({
				loggedIn: true,
				username: username
			});
		} else {
			this.setState({
				loggedIn: false,
				username: ''
			});
		}
	}

	loginInfo() {
		if (this.state.loggedIn) {
			return (
				<span>{this.state.username}</span>
			)
		} else {
			return (
				<a href="/auth/reddit" className="button">Log in</a>
			)
		}
	}

	render() {

		return(
			<div className="Login">
				{this.loginInfo.call(this)}
			</div>
		)
	}
};

export default Login;