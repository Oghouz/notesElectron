const remote = require('electron').remote;
const Menu = require('electron').remote.Menu;


function quitApp()
{
	remote.dialog.showMessageBox({
	    type: 'warning',
	    title: 'Attention !',
	    message: 'Vous-voulez vraiment quitter cette application?',
	    buttons: ['OK', 'Cancel']
	});
}

function saveFile()
{
	remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
		title: 'Enregistre votre travail',
		filters: [
			{name: 'Fichier de texte', extensions: ['txt']},
			{name: 'Fichier de word', extensions: ['doc']},
			{name: 'Tous les fichier', extensions: ['*']}
		]
	},
	(file) => {
			alert(`Vous avez enregistre sous ${file}`);
		}
	)
}

const template = [
    {
        label: 'Fichier',
        submenu: [
        	{
        		label: 'Nouveau',
        		accelerator: 'Ctrl+N'
        	},
            {
                label: 'Enregistrer',
                accelerator: 'Ctrl+S',
                click: () => { saveFile() }
            }, 
            {
                label: 'Ouvrir',
                accelerator: 'Ctrl+O'
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
    }
];
const menu = remote.Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


