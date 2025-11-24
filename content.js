(function () {
    'use strict';

    const versionRegex = /(\d+\.\d+\.\d+(\.\d+)?)/;

    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);

        return urlParams.get(name);
    }

    function getTargetPlatform() {
        const capability = document.querySelector('div.capabilities-list-item');

        if (!capability || capability.textContent.includes('Universal')) {
            return null;
        }

        const ua = navigator.userAgent;

        if (ua.includes('Windows')) {
            return ua.includes('ARM64') ? 'win32-arm64' : 'win32-x64';
        }

        if (ua.includes('Macintosh')) {
            // Default to darwin-x64 as it works on both Intel and Apple Silicon (via Rosetta 2)
            // and synchronous detection of Apple Silicon is unreliable.
            return 'darwin-x64';
        }

        if (ua.includes('Linux')) {
            const isAlpine = ua.includes('Alpine');
            const isArm64 = ua.includes('aarch64') || ua.includes('arm64');
            const isArm32 = ua.includes('arm');

            if (isAlpine) {
                return isArm64 ? 'alpine-arm64' : 'alpine-x64';
            }

            if (isArm64) return 'linux-arm64';

            if (isArm32) return 'linux-armhf';

            return 'linux-x64';
        }

        return 'linux-x64';
    }

    function createDownloadButtonWithContainer() {
        const span = document.createElement('span');
        span.className = 'ux-oneclick-install-button-container';
        span.style.marginLeft = '10px';

        const a = document.createElement('a');
        a.textContent = 'Download';
        a.className = 'ux-button install vscode-downloader-btn';
        a.style.backgroundColor = '#007acc'; // VS Code blue
        a.style.color = 'white';
        a.style.border = 'none';
        a.style.paddingTop = '6px';
        a.style.fontWeight = '600';

        a.addEventListener('click', async e => {
            e.preventDefault();
            e.stopPropagation();

            const itemName = getQueryParam('itemName');

            if (!itemName) {
                alert('Could not find itemName in URL.');

                return;
            }

            const [publisherId, extensionId] = itemName.split('.');

            if (!publisherId || !extensionId) {
                alert('Invalid itemName format.');

                return;
            }

            a.textContent = 'Fetching Version...';
            a.disabled = true;

            try {
                const version = await getLatestVersion();

                const targetPlatform = getTargetPlatform();

                if (version) {
                    const downloadUrl =
                        targetPlatform
                            ? `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisherId}/vsextensions/${extensionId}/${version}/vspackage?targetPlatform=${targetPlatform}`
                            : `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisherId}/vsextensions/${extensionId}/${version}/vspackage`;

                    window.location.href = downloadUrl;
                } else {
                    // Fallback to "latest" if version extraction fails, though user preferred explicit version.
                    // But let's try to stick to the plan of getting the version.
                    // If we really can't find it, we might alert or fallback.
                    // For now, let's alert.
                    alert('Could not determine the latest version.');
                }
            } catch (err) {
                console.error('Error fetching version:', err);

                alert('Error fetching version. Check console.');
            } finally {
                a.textContent = 'Download';
                a.disabled = false;
            }
        });

        span.appendChild(a);

        return span;
    }

    async function getLatestVersion() {
        // 1. Try to find version in the page if already visible (unlikely for history, but maybe in header?)
        // The header usually has the version, let's check the DOM inspection again or just rely on history.
        // The user specifically mentioned "Version History" tab.

        const versionHistoryTab = document.getElementById('versionHistory');
        if (!versionHistoryTab) {
            console.error('Version History tab not found.');
            return null;
        }

        // Click the tab to load/reveal content
        versionHistoryTab.click();

        // Wait a bit for content to be visible/loaded.
        // Since it might be a client-side switch or async load, we need to wait.
        // We'll poll for the version text.

        return new Promise((resolve) => {
            const maxAttempts = 20; // 2 seconds roughly

            let attempts = 0;

            const interval = setInterval(() => {
                attempts++;

                const firstVersionCell = document.querySelector('table.version-history-table tbody tr td:first-child');

                if (firstVersionCell) {
                    const text = firstVersionCell.innerText;

                    const match = versionRegex.exec(text);

                    if (match) {
                        clearInterval(interval);
                        resolve(match[0]);

                        return;
                    }
                }

                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    resolve(null);
                }
            }, 100);
        });
    }

    function injectButton() {
        const installButton = document.querySelector('a.ux-button.install');

        if (!installButton) return;

        const installButtonContainer = installButton.parentElement;

        if (!installButtonContainer?.classList.contains('ux-oneclick-install-button-container')) return;

        // Check if we already injected
        // We look for our specific class in the parent's children
        if (installButtonContainer.parentNode.querySelector('.vscode-downloader-btn')) return;

        const downloadBtnContainer = createDownloadButtonWithContainer();

        installButtonContainer.parentNode.insertBefore(downloadBtnContainer, installButtonContainer.nextSibling);
    }

    function init() {
        injectButton();

        // Observe the body for changes to handle dynamic content loading (SPA navigation, re-renders)
        const observer = new MutationObserver(injectButton);

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Run init when page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
