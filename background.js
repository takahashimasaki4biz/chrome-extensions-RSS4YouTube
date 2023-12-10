chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});

function setIcon(tabId, tabUrl) {
    if (tabUrl && (tabUrl.startsWith('https://www.youtube.com/@') || tabUrl.startsWith('https://www.youtube.com/watch'))) {
        chrome.action.setIcon({ path: "icons/icon16.png", tabId: tabId });
    } else {
        chrome.action.setIcon({ path: "icons/icon16-gray.png", tabId: tabId });
    }
}
chrome.tabs.onActivated.addListener(async function (activeInfo) {
    tab = await chrome.tabs.get(activeInfo.tabId);
    setIcon(activeInfo.tabId, tab.url);
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    setIcon(tabId, tab.url);
});
