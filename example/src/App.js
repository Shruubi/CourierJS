import * as React from 'react';
import AppChild from './AppChild';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			apiResponse: ""
		};

		this.props.messenger.subscribe('fetch-api', this.onReceiveAPIPromise.bind(this));
	}

	onReceiveAPIPromise(data) {
		data.then(this.onDataLoaded.bind(this));
	}

	onDataLoaded(data, status, xhr) {
		let newState = Object.assign(this.state, {
			apiResponse: JSON.stringify(data)
		});

		this.setState(newState);
	}

	render() {
		return (
			<div>
				<h1>CourierJS ReactJS Example</h1>
				<AppChild messenger={this.props.messenger} />
				<pre>{this.state.apiResponse}</pre>
			</div>
		);
	}
}