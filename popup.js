// popup.js
console.log('Hello from Prash');

document.addEventListener('DOMContentLoaded', function() {
    const applyBtn = document.getElementById('apply-btn');
    const clearDataButton = document.getElementById('clearDataButton');
    const randomMarkBtn = document.getElementById('randomMarkBtn');
    const week = document.getElementById('week');
    const mark = document.getElementById('mark');
    const messageBox = document.getElementById('customeMessage');
    
    randomMarkBtn.addEventListener('click', function() {
      const totalQuestion = document.getElementById('totalQuestion');
      const totalQuestionToPass = parseFloat(totalQuestion.value);
      if (!isNaN(totalQuestionToPass)) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          const currentTab = tabs[0];
          chrome.tabs.sendMessage(currentTab.id, { action: 'assignRandomValues',question:totalQuestionToPass});
          messageBox.innerText="Marks Applied Randomly.";
        });
      } else {
        alert('Please enter a valid number for total question.');
      }
    });
    
    applyBtn.addEventListener('click', function() {
      // console.log("add call")
      const markToPass = mark.value;
      const weekToPass = parseFloat(week.value);
      // console.log(markToPass,weekToPass)
      
      if (!isNaN(weekToPass)) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          const currentTab = tabs[0];
          chrome.tabs.sendMessage(currentTab.id, { action: 'modifyMarks', mark: markToPass,week:weekToPass });
          messageBox.innerText = `Marks applied for week ${weekToPass}.`;
        });
      } else {
        alert('Please enter a valid number for week.');
      }
    });
    
    
    clearDataButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        chrome.tabs.sendMessage(currentTab.id, { action: 'clearStorage'});
        messageBox.innerText= "Data cleared.";
      });
    });


  });
  

  