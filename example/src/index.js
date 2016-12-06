import Courier from 'courierjs';
import jQuery from 'jquery';
import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// create CourierJS instance and register middleware
let messenger = new Courier();
messenger.register('fetch-api', function (data, next) {
	jQuery.ajax(data).then(next);
});

ReactDOM.render(
  <App messenger={messenger} />,
  document.getElementById('root')
);