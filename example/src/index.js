import Courier from 'courierjs';
import jQuery from 'jquery';
import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

let messenger = new Courier();
messenger.register('fetch-api', function (data) {
	return jQuery.ajax(data);
});

ReactDOM.render(
  <App messenger={messenger} />,
  document.getElementById('root')
);