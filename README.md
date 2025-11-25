# VS Code Marketplace Downloader
[![Chrome Users](https://img.shields.io/chrome-web-store/users/hfdpikfannfpibndlihjglbjmklhicgf?style=for-the-badge&logo=googlechrome&label=Chrome%20Users)](https://chromewebstore.google.com/detail/hfdpikfannfpibndlihjglbjmklhicgf) [![Mozilla Add-on Users](https://img.shields.io/amo/users/vscode-marketplace-downloader?style=for-the-badge&logo=firefoxbrowser&label=Firefox%20Users)](https://addons.mozilla.org/en-US/firefox/addon/vscode-marketplace-downloader)

A browser extension that enhances the Visual Studio Code Marketplace by adding a direct **Download** button for VSIX files.

## Features

- **Direct Download**: Adds a "Download" button next to the "Install" button on extension pages.
- **Version Awareness**: Automatically detects and downloads the latest version of the extension.
- **Platform Support**: Handles different target platforms (e.g., win32-x64, linux-x64, darwin-arm64) if applicable.
- **Cross-Browser**: Designed to work on Chrome, Firefox, and other Chromium-based browsers.

## Installation

Download the extension or clone this repository, then follow the instructions below:

### Chrome / Edge / Opera / Brave
1. Open your browser's extensions page (e.g., `chrome://extensions/`).
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the directory containing the extension files.

### Firefox
1. Open `about:debugging`.
2. Click **This Firefox**.
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.json` file.

## Usage

1. Navigate to any extension page on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/vscode).
2. You will see a new **Download** button next to the standard Install button.
3. Click it to download the `.vsix` file directly to your machine.

## License

[MIT](LICENSE)