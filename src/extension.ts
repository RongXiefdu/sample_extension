// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const impor = require('impor')(__dirname);
import * as path from 'path';
import * as sdk from 'vscode-iot-device-cube-sdk';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	const testcmd = vscode.commands.registerCommand('extension.testcmd', async () => {
		vscode.window.showInformationMessage('Test!');
		
		// here to test module sdk's method. The followings are two examples.
		// remember to run this extension in a container

		// list volume
		console.log("Listing volumes...");
		const vl = await sdk.FileSystem.listVolume();
		console.log(vl);

		// transfer folder from container to local machine
		// followings are sample values, please change to your own path
		const localDir = "C:\\Users\\t-roxie\\Desktop\\demo"; 
		const remoteDir = "/workspaces/helloworld/src";
		try {
			console.log("Transferring folder...");
			await sdk.FileSystem.transferFolder(remoteDir, localDir);
			console.log("Folder transferred successfully!");
		} catch(err) {
			console.log(err);
		}

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(testcmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
