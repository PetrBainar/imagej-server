// React requires
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

// Consts
const HOST = 'http://localhost:8080';
const DIR_MODULES = '/modules';
const DIR_OBJECTS = '/objects';
const ROTATION_MODULE_NAME = 'RotateImageXY';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageRotationModuleId: null,
			imageId: null,
			refreshTime: null
		};

		// These bindings are needed to make 'this' working in the callback
		this.findImageRotationModule = this.findImageRotationModule.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.refreshImage = this.refreshImage.bind(this);
		this.rotateImage = this.rotateImage.bind(this);

		this.findImageRotationModuleJQuery = this.findImageRotationModuleJQuery.bind(this);
		this.uploadImageJQuery = this.uploadImageJQuery.bind(this);
		this.refreshImageJQuery = this.refreshImageJQuery.bind(this);
		this.rotateImageJQuery = this.rotateImageJQuery.bind(this);
	}

	render() {
		return (
			<div>
				<button id="findImageRotationModule" onClick={this.findImageRotationModule}>Find module</button>
				<span>{this.state.imageRotationModuleId}</span>
				<br />
				<input id="imageSelection" type="file" />
				<br />
				<button id="imageUpload" onClick={this.uploadImage}>Upload image</button>
				<span>{this.state.imageId}</span>
				<br />
				<button id="imageRefresh" onClick={this.refreshImage}>Refresh image</button>
				<span>{this.state.refreshTime}</span>
				<br />
				<button id="imageRotation" onClick={this.rotateImage}>Rotate image</button>
				<br />
				<img src={`${HOST}${DIR_OBJECTS}/${this.state.imageId}/jpg?timestamp=${this.state.refreshTime}`} />
			</div>
		);
	}

	findImageRotationModule() {
		this.findImageRotationModuleJQuery();
	}

	findImageRotationModuleJQuery() {
		$.ajaxSetup({
			async: false
		});

		let moduleId = null;

		// Find the image rotation module
		$.getJSON(HOST + DIR_MODULES, function(data) {
			for (let module of data) {
				if (module.slice(module.lastIndexOf('.') + 1).localeCompare(ROTATION_MODULE_NAME) == 0) {
					moduleId = module;
					break;
				}
			}
		});

		this.setState(() => ({imageRotationModuleId: moduleId}));
	}

	uploadImage() {
		if (this.uploadImageJQuery() == true)
			this.refreshImage(); // Refresh if there is a result to be seen
	}

	uploadImageJQuery() {
		let success = false;

		// Select an image file
		let files = $('#imageSelection').prop('files');
		if (files.length != 1) {
			alert(`Need exactly 1 file to upload (has ${files.length})`);
			return;
		}
		let data = new FormData();
		data.append('file', files[0]);

		// Upload the selected image to the server
		$.ajax({
			url: HOST + DIR_OBJECTS + '/upload',
			type: 'POST',
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			success: function() {
				success = true;
			}
		})

		return success;
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
		var lastImageId = null;

		// Get id of the last image on the server
		$.getJSON(HOST + DIR_OBJECTS, function(data) {
			for (let id of data) {
				lastImageId = id;
			}
		});

		this.setState(() => ({imageId: lastImageId, refreshTime: time.toString()}));
	}

	rotateImage() {
		if (this.rotateImageJQuery() == true)
			this.refreshImage(); // Refresh if there is a result to be seen
	}

	rotateImageJQuery() {
		let success = false;
		let jsonInputs = {
			context: null,
			dataset: this.state.imageId,
			angle: 90,
			datasetService: null
		};

		// Post prepared inputs to the server
		$.ajax({
			type: 'POST',
			url: HOST + DIR_MODULES + '/' + this.state.imageRotationModuleId.toString(),
			data: JSON.stringify(jsonInputs),
			dataType: 'json',
			contentType: 'application/json',
			success: function() {
				success = true;
			},
		});

		return success;
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);