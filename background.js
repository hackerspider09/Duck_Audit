console.log('Hello from Prash');
// Developed By Prasad (hackerspider09)


chrome.runtime.onInstalled.addListener(function(details) {
  // console.log('Extension installed or browser started');

  // Automatically trigger assignPreValues when the extension is installed or browser is started
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.management.setEnabled(chrome.runtime.id, true, function() {
      console.log('Extension enabled after installation/update');
    });
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if the tab has completed loading
    if (changeInfo.status === 'complete') {
      // Trigger the action when the tab is fully loaded
      console.log("Sending assignPreValues after refresh.");
      chrome.tabs.sendMessage(tabId, { action: 'assignPreValues' });
    }
  });