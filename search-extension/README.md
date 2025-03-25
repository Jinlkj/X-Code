# search-extension README

这个 Visual Studio Code 扩展提供了一个侧边栏，其中的 Webview 显示来自 Vue.js 项目的内容。请按照以下说明进行设置和运行扩展。

## 前提条件

- [Node.js](https://nodejs.org/)（包含 npm）
- [Visual Studio Code](https://code.visualstudio.com/)

## 入门指南

### 1. 启动 Vue.js 项目

首先，导航到 Vue.js 项目目录并启动开发服务器：

```bash
cd media/chatbot
npm install
npm run serve
```

这将启动 Vue.js 开发服务器，通常在 `http://localhost:8080` 上运行。

### 2. 启动 Visual Studio Code 扩展

在 Visual Studio Code 中调试和运行扩展：

#### 在 Mac 上：

按 `fn + F5`。

#### 在 Windows 上：

按 `F5`。

这将打开一个加载了扩展的新 Visual Studio Code 实例。

### 3. 查看 Webview 的网页源码

要检查 Webview 的网页源码，可以打开开发者工具：

1. 按 `Command + Shift + P` 打开命令面板。
2. 输入并选择 `Open Webview Developer Tools`。

这将打开开发者工具，您可以在其中检查 Webview 内容的 HTML、CSS 和 JavaScript。

## 其他信息

- 请确保在启动扩展之前，Vue.js 开发服务器已运行，因为 Webview 依赖它来显示内容。
- 如果遇到任何问题，请检查终端输出的错误信息，并确保所有依赖项已正确安装。

## 许可证

此项目使用 MIT 许可证。有关详细信息，请参阅 [LICENSE](../LICENSE) 文件。