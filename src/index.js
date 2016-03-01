if (module.hot) {
	module.hot.accept();
}

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.scss';

ReactDOM.render(Routes, document.getElementById('app'));
