const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;
const fs = require('fs');

remote.getCurrentWindow().setMenu(null);
var paramWindow = remote.getCurrentWindow();

var autoSave = $('#auto-save');
var notif = $('#notif');

var save = $('#save');
var cancel = $('#cancel');

getParams();

save.on('click', function() {

	var p = {
		"autoSave": autoSave.is(':checked') ? 1 : 'off',
		"notif": notif.is(':checked') ? 1 : 'off'
	}

	fs.writeFile('params.json', JSON.stringify(p));
	paramWindow.close();

})

cancel.on('click', function () {
	paramWindow.close();
})


function getParams()
{
	var params = fs.readFile('params.json', function (err, data) {
		var p = JSON.parse(data);
		var valAutoSave = (p.autoSave == 1) ? true : false;
		var valNotif = (p.notif == 1) ? true : false;
		autoSave.prop('checked', valAutoSave);
		notif.prop('checked', valNotif);
	})
}
