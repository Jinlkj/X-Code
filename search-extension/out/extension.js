"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function activate(context) {
    vscode.window.registerWebviewViewProvider('search-result', new SearchSideBarProvider(context.extensionUri));
}
function deactivate() { }
class SearchSideBarProvider {
    extensionUri;
    constructor(extensionUri) {
        this.extensionUri = extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
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
//# sourceMappingURL=extension.js.map