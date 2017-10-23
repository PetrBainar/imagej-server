var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

// Consts
const HOST = 'http://localhost:8080';
const DIR_MODULES = '/modules';
const JSX_SUCCESS = (<h1>Success</h1>);
const JSX_FAILURE = (<h1>Not yet</h1>);

class App extends React.Component {
	constructor(props) {
		super(props);
	}	
	
	render() {
		let retrievalSuccess = this.checkConnectionJQuery();
		return retrievalSuccess ? JSX_SUCCESS : JSX_FAILURE;
	}

	checkConnectionJQuery() {		
		$.ajaxSetup({
			async: false
		});
		
		let success = false;
		
		$.getJSON(HOST + DIR_MODULES, function(data, status) {
			success = true;
		});
		
		return success;		
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);