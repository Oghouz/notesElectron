const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;
const fs = require('fs');
const modal = require('electron-modal');
const path = require('path');

var content = $('#content');
content.focus();

var saveAction = false;

const WindowsToaster = require('node-notifier').WindowsToaster;
var notifier = new WindowsToaster({
    withFallback: false, // Fallback to Growl or Balloons? 
    customPath: void 0 // Relative path if you want to use your fork of toast.exe 
});

const template = [
    {
        label: 'Fichier',
        submenu: [
        	{
        		label: 'Nouveau',
        		accelerator: 'Ctrl+N',
        		click: () => { newFile() }
        	},
        	{
                label: 'Ouvrir...',
                accelerator: 'Ctrl+O',
                click: () => { openFile() }
            }, 
            {
                label: 'Enregistrer',
                accelerator: 'Ctrl+S',
                click: () => { saveFile() }
            }, 
            {
            	label: 'Enregistrer sous...',
            	click: () => { saveAsFile() }
            },
            {
            	type: 'separator'
            },
            {
            	label: 'Imprimer...',
            	accelerator: 'Ctrl+P',
            	click: () => {}
            },
            {
            	type: 'separator'
            },
            {
    			label: 'Parametre',
    			click: () => { params() }
    		},
    		            {
            	type: 'separator'
            },
            {
                label: 'Quitter',
                accelerator: 'Ctrl+Q',
                click: () => { quitApp() }
            }
        ]
    },
    {
        label: 'Edition',
        submenu: [
            {
                label: 'Annuler',
                accelerator: 'Ctrl+Z'
            }, 
            {
                label: 'Copier',
                accelerator: 'Ctrl+C',
                click: () => { document.execCommand('copy') }
            }, 
            {
                label: 'Coller',
                accelerator: 'Ctrl+V',
                click: () => { document.execCommand('paste') }
            }
        ]
    }, 
    {
    	label: 'Style',
    	submenu: [
    		{
    			label: 'Couleur plan arriere',
    			submenu: [
    				{
    					label: 'Gris',
    					click: () => { setContentBg('gray') }
    				},
    				{
    					label: 'Blanc',
    					click: () => { setContentBg('white') }
    				}, 
    				{
    					label: 'Noir',
    					click: () => { setContentBg('black') }
    				}
    			]
    		}, 
    		{
    			label: 'Couleur de texte',
    			submenu: [
    				{
    					label: 'Gris',
    					click: () => { SetContentFontColor('gray') }
    				},
    				{
    					label: 'Blanc',
    					click: () => { SetContentFontColor('white') }
    				}, 
    				{
    					label: 'Noir',
    					click: () => { SetContentFontColor('black') }
    				}
    			]
    		},
    		{
    			label: 'Taille de texte',
    			submenu: [
    				{
    					label: 'Petit',
    					click: () => { setFontSize(12) }
    				},
    				{
    					label: 'Moyenne',
    					click: () => { setFontSize(16) }
    				},
    				{
    					label: 'Grande',
    					click: () => { setFontSize(21) }
    				},
    			]
    		}
    	]
    },
    {
    	label: '?'
    }
];

/**
 * @return {[type]} [description]
 */
function newFile()
{
	saveAction = false;
	content.val('');
}

/**
 * @return {[type]} [description]
 */
function openFile()
{
	remote.dialog.showOpenDialog(remote.getCurrentWindow(),{
		title: 'Selection une fichier de texte',
		filters: [
			{name:'Fichier de texte', extensions: ['txt']}
		]
	} ,(filename) => {
		if(filename) {
			var path = String(filename).replace(/\//g, 'ForwardSlash');
			saveAction = path;
			fs.readFile(path, 'utf-8', (err, data) => {
				content.val(data);
			})
		}
	})
}

/**
 * @return {[type]} [description]
 */
function saveFile()
{
	if (saveAction) {
		fs.writeFile(saveAction, content.val(), function (err) {
			if (err) {
				console.log(err);
			}
		})
	} else {
		remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
			title: 'Enregistre votre fichier',
			filters: [
				{name: 'Fichier de texte', extensions: ['txt']},
				{name: 'Tous les fichier', extensions: ['*']}
			]
		},
		(file) => {
			if (file) {
				saveAction = file;
				fs.appendFile(file, content.val(), function (err) {
					if (err) {
						console.log(err);
					}
				})
				notif(`Vous avez enregistre sous ${file}`);
				}
			}
		)
	}
}

/**
 * @return {[type]} [description]
 */
function saveAsFile()
{
	remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
			title: 'Enregistre votre fichier',
			filters: [
				{name: 'Fichier de texte', extensions: ['txt']},
				{name: 'Tous les fichier', extensions: ['*']}
			]
		},
		(file) => {
			if (file) {
				saveAction = file;
				fs.writeFile(file, content.val(), function (err) {
					if (err) {
						console.log(err);
					}
				})
				notif(`Vous avez enregistre sous ${file}`);
			}
		}
	)
}

/**
 * Quit application
 * @return {[type]} [description]
 */
function quitApp()
{
	remote.dialog.showMessageBox({
	    type: 'warning',
	    title: 'Attention !',
	    message: 'Vous-voulez vraiment quitter cette application?',
	    buttons: ['OK', 'Cancel']
	}, function (result) {
		if (!result) {
			app.quit();
		}
	});
}

/**
 * Set content bacground color
 * @param {[type]} color [description]
 */
function setContentBg(color)
{
	content.attr("style", "background-color: " + color + ";")
}

/**
 * Set content text color
 * @param {[type]} color [description]
 */
function SetContentFontColor(color)
{
	content.css("color", color);
}

/**
 * Set content font size
 * @param {[type]} size [description]
 */
function setFontSize(size)
{
	content.css("font-size", size);
}

/**
 * Notification
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function notif(message)
{
	notifier.notify({
	    title: "Bloc-notes Electron",
	    message: message,
	    icon: "assets/note.png", 
	    sound: true,
	    wait: false,
	}, function(error, response) {
	    console.log(response);
	});
}

const menu = remote.Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


function setFrameTitle()
{
	if (saveAction) {
		$(document).ready(function() {
		    document.title = 'Note-bloc Electron ('+saveAction+')';
		});
	}
}



function params()
{
	let win = new remote.BrowserWindow({
		parent: remote.getCurrentWindow(),
		modal: true,
		width: 400,
	    height: 300,
	    icon: 'assets/param.png',
	    title: 'Parametre',
	    center: true,
	    movable: true,
	    resizable: false,
	    backgroundColor: '#e0e0e0'
	})

	var theUrl = `file://${__dirname}/param.html`;
	win.loadURL(theUrl);
}