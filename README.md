# CourierJS

A simple event messenger that allows you to apply some middleware before
the message is received by the listener.

Inspired by Flux and Redux.

### About

CourierJS is designed to be a simple message receiver and dispatcher, with the
option of applying middleware to the data passed to an event and passing that
processed data to the listeners.

The concept was inspired by learning how Flux and Redux works. Redux uses the
store to subscribe and publish action messages, with the reducer sitting in the
middle as a processor that takes the action message and generates a new state
for the component.

In CourierJS, the messenger works as your store, brokering messages from publishers
to subscribers, and the middleware functions as your reducer, with the benefit of
being able to break your reducer up into distinct steps. This allows a more functional
approach as the focus is on functions generating your new state as opposed to
storing and mutating state.

### Installation

You can install CourierJS by running the following:

```
$ npm install --save courierjs
```

### Importing

You can include CourierJS by doing the following

```
// ES6 imports
import Courier from 'courierjs';

// or...

// standard node require()
var Courier = require('courierjs').default;
```

### Usage

To use CourierJS, you need to instantiate the messenger object.

```
let messenger = new Courier();
```

The `subscribe()` function takes an event identifier string, and a callback
function which will be called when a message with that identifier is received.
The subscribe callback takes one argument, data which is either the data object
passed to the `publish()` method, or the result returned by applying the middleware
to the data object passed to the `publish()` method.

```
messenger.subscribe('message-id', (data) => {
	console.log(data);
});
```

The `publish()` function allows you to send a message and data to all available
subscribers.

```
messenger.publish('message-id', { 
	someVal: 'hello world', 
	someOtherVal: 'this is a test' 
});
```

Sometimes, you no longer need subscribers to listen for a message, in this case
you can use `clear()` to remove all subscribers to a particular message id.

```
messenger.clear('message-id');
// messenger.listeners['message-id'].length === 0
```

Middleware can be registered to a particular message id by using the `register()`
function. The register function takes the message id it will be applied to as the
first param and an applicator function as the second param.

The applicator function will take one parameter which is either the data object
passed to publish if the applicator function is the first in the middleware chain,
otherwise it is the result of applying each applicator function prior to the current
function to the object passed to the publish method.

```
let messenger = new Courier();

messenger.subscribe('test', function (data) {
	console.log(data); // prints { val: 3 }
});

messenger.register('test', function (data) {
	// data is: { val: 0 }
	data.val += 1;
	return data;
});

messenger.register('test', function (data) {
	// data is: { val: 1 }
	data.val += 1;
	return data;
});

messenger.register('test', function (data) {
	// data is: { val: 2 }
	data.val += 1;
	return data;
});

courier.publish('test', { val: 0 });
```

### License

This software is licensed under the MIT license. Refer to `LICENSE` for details.