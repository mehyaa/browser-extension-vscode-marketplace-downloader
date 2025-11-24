# VS Code Marketplace Downloader

A browser extension that enhances the Visual Studio Code Marketplace by adding a direct **Download** button for VSIX files.

## Features

- **Direct Download**: Adds a "Download" button next to the "Install" button on extension pages.
- **Version Awareness**: Automatically detects and downloads the latest version of the extension.
- **Platform Support**: Handles different target platforms (e.g., win32-x64, linux-x64, darwin-arm64) if applicable.
- **Cross-Browser**: Designed to work on Chrome, Firefox, and other Chromium-based browsers.

## Installation

1. Clone this repository.
2. Open your browser's extension management page:
   - **Chrome/Edge**: `chrome://extensions`
   - **Firefox**: `about:debugging#/runtime/this-firefox`
3. Enable **Developer Mode**.
4. Click **Load unpacked** (or "Load Temporary Add-on" in Firefox).
5. Select the folder containing `manifest.json`.

## Usage

1. Navigate to any extension page on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/vscode).
2. You will see a new **Download** button next to the standard Install button.
3. Click it to download the `.vsix` file directly to your machine.

## Files

- `manifest.json`: The extension manifest file.
- `content.js`: The content script that injects the button and handles the download logic.
- `icon.png`: The extension icon.
