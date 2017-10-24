var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

// Consts
const HOST = 'http://localhost:8080';
const DIR_MODULES = '/modules';
const DIR_OBJECTS = '/objects';

// Helpers
function successFlagToString(success) {
	if (success == true) {
		return "OK";
	}
	else {
		return "Failure";
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			connectedToServer: false,
			imageUploaded: false,
			imageSrc: null,
			refreshTime: null
		};
		
		// These bindings are needed to make 'this' working in the callback
		this.checkConnection = this.checkConnection.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.refreshImage = this.refreshImage.bind(this);
		
		this.checkConnectionJQuery = this.checkConnectionJQuery.bind(this);
		this.uploadImageJQuery = this.uploadImageJQuery.bind(this);
		this.refreshImageJQuery = this.refreshImageJQuery.bind(this);
	}	
	
	render() {
		return (
			<div>
				<button id="checkConnection" onClick={this.checkConnection}>Check connection</button>
				<span>{successFlagToString(this.state.connectedToServer)}</span>
				<br />
				<input id="imageSelection" type="file" />
				<br />
				<button id="imageUpload" onClick={this.uploadImage}>Upload image</button>
				<span>{successFlagToString(this.state.imageUploaded)}</span>
				<br />
				<button id="imageRefresh" onClick={this.refreshImage}>Refresh image</button>
				<span>{this.state.refreshTime}</span>
				<br />
				<img src={this.state.imageSrc} />
			</div>
		);		
	}
	
	checkConnection() {
		this.checkConnectionJQuery();
	}
	
	checkConnectionJQuery() {	
		$.ajaxSetup({
			async: false
		});
		
		let success = false;
		
		$.getJSON(HOST + DIR_MODULES, function(data, status) {
			success = true;
		});
		
		this.setState(() => ({connectedToServer: success}));
	}
		
	uploadImage() {
		this.uploadImageJQuery();
	}
	
	uploadImageJQuery() {		
		let success = false;
		
		let files = $('#imageSelection').prop('files');
		if (files.length != 1) {
			alert(`Need exactly 1 file to upload (has ${files.length})`);
			return;
		}
		let data = new FormData();
		data.append('file', files[0]);
				
		$.ajax({
			url: HOST + '/objects/upload',
			type: 'POST',
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			success: function(rtn, status, xhr) {
				success = true;
			},
			error: function(xhr, status, err) {
				// TODO: better error handling
				;
			}
		})
		
		this.setState(() => ({imageUploaded: success}));
	}
	
	refreshImage() {
		this.refreshImageJQuery();
	}
	
	refreshImageJQuery() {
		$.ajaxSetup({
			async: false
		});
		
		let date = new Date();
		let time = date.getTime();
		let src = null;
		
		$.getJSON(HOST + DIR_OBJECTS, function(data) {			
			for (let id of data) {				
				src = `${HOST}${DIR_OBJECTS}/${id}/jpg?timestamp=${time}`;								
			}
		});
		
		this.setState(() => ({imageSrc: src, refreshTime: time.toString()}));
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);