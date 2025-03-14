import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.registerWebviewViewProvider('search-result', new SearchSideBarProvider(context.extensionUri));
}

export function deactivate() {}




class SearchSideBarProvider implements vscode.WebviewViewProvider {
    constructor(private readonly extensionUri: vscode.Uri) {}
    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media/chatbot/dist')]
        };

        const htmlPath = path.join(this.extensionUri.fsPath, 'media/chatbot/dist', 'index.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // 获取 Webview URI
        const webviewUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media/chatbot/dist')).toString();
        console.log(webviewUri);
        // 插入脚本，将 webviewUri 传递给前端应用
        const injectInContent = `<script> window.webviewUri = "${webviewUri}"</script>`;

        // 使用正则表达式替换 script 和 link 标签中的 src 和 href
        htmlContent = htmlContent.replace(/<script\s+.*?src="([^"]+)"/g, (match, src) => {
            const newSrc = vscode.Uri.joinPath(vscode.Uri.parse(webviewUri), src).toString();
            return match.replace(src, newSrc);
        });

        htmlContent = htmlContent.replace(/<link\s+.*?href="([^"]+)"/g, (match, href) => {
            const newHref = vscode.Uri.joinPath(vscode.Uri.parse(webviewUri), href).toString();
            return match.replace(href, newHref);
        });

        // 将 injectInContent 插入到 HTML 内容中
        htmlContent = htmlContent.replace('</head>', `${injectInContent}</head>`);

        webviewView.webview.html = htmlContent;
    }
}