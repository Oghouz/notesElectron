const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;
const fs = require('fs');

remote.getCurrentWindow().setMenu(null);
var postWindow = remote.getCurrentWindow();

var method = $('#method').val();
var request_url = $('#request_url');
var content = $('content').val();
var addParam = $('#addParam');
var iParam = 1;

addParam.on('click', function () {
	iParam++;
	event.preventDefault();
	var params = $('#params');
	var strParam = '<div>Key:<input type="text" name="param-key" id="param-key-'+iParam+'">Value:<input type="text" name="param-value" id="param-value-'+iParam+'"></div>';
	params.append(strParam);
})

$('#post-request').submit(function (event) {

	//event.preventDefault();
	if (method == 'get') {
		axios.get(request_url.val())
		.then(function (response) {
			alert(response);
		})
		.catch(function(error) {
			confirm('error');
		})
	}

})