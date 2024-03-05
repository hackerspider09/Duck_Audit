// popup.js

document.addEventListener('DOMContentLoaded', function() {
    const applyBtn = document.getElementById('apply-btn');
    const clearDataButton = document.getElementById('clearDataButton');
    const week = document.getElementById('week');
    const mark = document.getElementById('mark');


    applyBtn.addEventListener('click', function() {
      console.log("add call")
      const markToPass = mark.value;
      const weekToPass = parseFloat(week.value);
      console.log(markToPass,weekToPass)
  
      if (!isNaN(weekToPass)) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          const currentTab = tabs[0];
          chrome.tabs.sendMessage(currentTab.id, { action: 'modifyMarks', mark: markToPass,week:weekToPass });
        });
      } else {
        alert('Please enter a valid number for marks increment.');
      }
    });


    clearDataButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        chrome.tabs.sendMessage(currentTab.id, { action: 'clearStorage'});
      });
    });


  });
  

  