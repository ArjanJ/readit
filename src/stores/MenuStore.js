import alt from '../alt';
import MenuActions from '../actions/MenuActions';

class MenuStore {

	constructor() {
		this.bindActions(MenuActions);
		this.state = {
			loading: true,
			menu: {}		
		}
	}

	fetchMenu() {
		this.setState({ loading: true });
	}

	fetchMenuSuccess(response) {
		let menu = response.data.children;

		this.setState({
			loading: false,
			menu: menu 
		});
	}

	fetchMenuFailed(response) {
		console.log(response);
	}
}

export default alt.createStore(MenuStore, 'MenuStore');