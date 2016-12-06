import * as React from 'react';

export default class AppChild extends React.Component {
	onButtonClick() {
		// when the button is clicked, send fetch-api message
		this.props.messenger.publish('fetch-api', {
			url: 'https://jsonplaceholder.typicode.com/posts',
			method: 'GET'
		});
	}

	render() {
		return (
			<div>
				<h3>Click below</h3>
				<button onClick={this.onButtonClick.bind(this)}>Click to spawn jQuery request</button>
			</div>
		);
	}
}