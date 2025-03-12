import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const searchSelection = vscode.commands.registerCommand('search-extension.searchSelection', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectionText = editor.document.getText(selection);

			const question = await vscode.window.showInputBox({
				prompt: '',
				placeHolder: ' ',
				value: `'${selectionText}'`
			});
			if (question) {
				const fakeData = [
					{}
				]
				const panel = vscode.window.createWebviewPanel(
					"",
					"",
					vscode.ViewColumn.One,
					{
						enableScripts:true
					}
				)
				panel.webview.html = getWebViewContent(fakeData)
			}
		}
	});
	context.subscriptions.push(searchSelection);
}

function getWebViewContent(data:{}[]) {
	// TODO: H5展示页面
	return ''
}

// This method is called when your extension is deactivated
export function deactivate() {}
