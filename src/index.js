if (module.hot) {
	module.hot.accept();
}

import 'abby';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Routes from './routes';

ReactDOM.render(Routes, document.getElementById('app'));
