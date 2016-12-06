import * as React from 'react';
import AppChild from './AppChild';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiResponse: ""
    };
    
    // tell CourierJS that the message handler is here
    this.props.messenger.subscribe('fetch-api', this.onReceiveAPIPromise.bind(this));
  }

  // because we have moved to a continuation based middleware passing style
  // we can have the deferred resolve method be the call which passes data
  // to the subscribers
  onReceiveAPIPromise(data) {
    // get the resolved promise and update state
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