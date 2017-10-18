const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;
const fs = require('fs');

var content = $('#content');
content.focus();

const template = [
    {
        label: 'Fichier',
        submenu: [
        	{
        		label: 'Nouveau',
        		accelerator: 'Ctrl+N'
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
                accelerator: 'Ctrl+C'
            }, 
            {
                label: 'Coller',
                accelerator: 'Ctrl+V'
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
    		
    	]
    }
];

function quitApp()
{
	remote.dialog.showMessageBox({
	    type: 'warning',
	    title: 'Attention !',
	    message: 'Vous-voulez vraiment quitter cette application?',
	    buttons: ['OK', 'Cancel']
	});
}

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
			fs.readFile(path, 'utf-8', (err, data) => {
				content.val(data);
			})
		}
	})
}

function saveFile()
{
	remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
		title: 'Enregistre votre fichier',
		filters: [
			{name: 'Fichier de texte', extensions: ['txt']},
			{name: 'Tous les fichier', extensions: ['*']}
		]
	},
	(file) => {

			fs.appendFile(file, content.val(), function (err) {
				if (err) {
					console.log(err);
				}
			})
			alert(`Vous avez enregistre sous ${file}`);
		}
	)
}

function setContentBg(color)
{
	content.attr("style", "background-color: " + color + ";")
}

function SetContentFontColor(color)
{
	content.css("color", color);
}

const menu = remote.Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


