// content.js

// Developed By Prasad (hackerspider09)

// console.log('Content script loaded');
console.log("Content script reloaded after refresh.");


function assignRandomValues(question) {

  chrome.storage.sync.get(['assignedValues'], function(result) {
    console.log("Stored values after refresh: ", result.assignedValues);

    const assignedValues = result.assignedValues || {};
    assignedValues['randomValue']=true;
      let values = assignedValues['randomMark'] || {};

      
    // Assign random values to specific IDs
    const spans = document.querySelectorAll('span[id^="assessment-score-"]');
    if(Object.keys(values).length <= 0){
      spans.forEach((span) => {
        const id = span.id;
        const randomValue = getMarks(question)
        values[id] = randomValue.toFixed(1);
        span.innerHTML = `&nbsp;&nbsp;<b>${randomValue.toFixed(1)}</b>`;
      });
    } else{
      spans.forEach((span) => {
        const id = span.id;
        const randomValue = values[id].toFixed(1);
        values[id] = randomValue;
        span.innerHTML = `&nbsp;&nbsp;<b>${randomValue.toFixed(1)}</b>`;
      });
    }

      assignedValues['randomMark']=values;
    
      chrome.storage.sync.set({ 'assignedValues': assignedValues });

    });

}
function assignPreValues() {

  chrome.storage.sync.get(['assignedValues'], function(result) {
    const assignedValues = result.assignedValues || {};
    // console.log(assignedValues)
    try {
      
      if(assignedValues['randomValue']){
        let marks = assignedValues['randomMark'];
        Object.entries(marks).forEach(([markId, mark]) => {
          const span = document.getElementById(markId);
          span.innerHTML = `&nbsp;&nbsp;<b>${mark}</b>`;
    
        });
      }else{
        let marks = assignedValues['modifyMark'];
        Object.entries(marks).forEach(([week, mark]) => {
          const span = document.getElementById('assessment-score-Week ' + week + ' : Assignment ' + week);
          span.innerHTML = `&nbsp;&nbsp;<b>${mark}</b>`;
    
        });

      }
    } catch (error) {
      console.log("prash: no entry");
    }

  });

}

function updateProgressBar() {
  // Get all the tr elements inside the div with id "unit_wise_progress"
const trElements = document.querySelectorAll('#unit_wise_progress table tbody tr');

// Iterate through each tr element
trElements.forEach((trElement) => {
  // Get the third td element inside the tr
  const thirdTd = trElement.querySelector('td:nth-child(3)');

  // Check if the third td element exists
  if (thirdTd) {
    // Get the progress element inside the tr
    const progressElement = thirdTd.querySelector('progress');
    if (progressElement) {
      progressElement.value = 100; 
      // Get the span element inside the third td
      const spanElement = thirdTd.querySelector('span');
  
      // Check if the span element exists
      if (spanElement) {
        // Change percentage in the span element 
        spanElement.innerHTML = '100%'; 
      }
    }

  }
});

}

function upDateCircle() {
  // Select the div with the class 'pie'
const pieElement = document.querySelector('.pie');

// Change the --p variable to 28
pieElement.style.setProperty('--p', '100');
pieElement.style.transition = "all 2s ease-in-out";

// Change the --p variable to 100 with the transition
// setTimeout(() => {
    // pieElement.style.setProperty('--p', '100');
// }, 100); // Delay to ensure transition is applied
// Update the inner text to 100%


pieElement.innerText = '100%';

}

function clearStorage() {
  chrome.storage.sync.clear(function() {
    console.log('prash: Stored data cleared ..');
  });
}

function getMarks(questions) {
  let incrementBy = 100 / questions;
    // Generate a random number between 6 and 10
    const assignmentMarks = Math.floor(Math.random() * (10 - 6 + 1)) + 6;

    // Calculate the percentage, but ensure it doesn't exceed 100%
    const calculatedPercentage = Math.min(incrementBy * assignmentMarks, 100);

    return parseFloat(calculatedPercentage)
}

function modifyMarks(mark,week) {
  // Retrieve assigned values from Chrome storage
  chrome.storage.sync.get(['assignedValues'], function(result) {
    const assignedValues = result.assignedValues || {};
    
    if(assignedValues['randomValue']){
      let values = assignedValues['randomMark'] || {};
      values['assessment-score-Week ' + week + ' : Assignment ' + week]=mark;

    }else{
      let values = assignedValues['modifyMark'] || {};
      assignedValues['randomValue']=false;
      // console.log(assignedValues)
      
      values[`${week}`]=mark;
      
      assignedValues['modifyMark']=values; 
    }

    const span = document.getElementById('assessment-score-Week ' + week + ' : Assignment ' + week);
    span.innerHTML = `&nbsp;&nbsp;<b>${mark}</b>`;
  
    chrome.storage.sync.set({ 'assignedValues': assignedValues });
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log('Received message:', request);
  upDateCircle();
  if (request.action === 'assignPreValues') {
    console.log("prash: prevalue assign.")
    updateProgressBar();
    assignPreValues();
    
  }
  if (request.action === 'assignRandomValues') {
    console.log("prash: assign random values.")
    const question = request.question;
    assignRandomValues(question);
  }
  if (request.action === 'clearStorage') {
    console.log("prash: clear data.")
    clearStorage();
  }

  if (request.action === 'modifyMarks') {
    console.log("prash: modify one entry.")
    const mark = request.mark;
    const week = request.week;
    modifyMarks(mark,week);
  }
});


  
/*
let questions = 10;
let incrementBy = 100 / questions;

// Generate a random number between 6 and 10
const assignmentMarks = Math.floor(Math.random() * (10 - 6 + 1)) + 6;

// Calculate the percentage, but ensure it doesn't exceed 100%
const calculatedPercentage = Math.min(incrementBy * assignmentMarks, 100);

console.log("marks ", calculatedPercentage);
*/




