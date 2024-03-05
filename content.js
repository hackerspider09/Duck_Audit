// content.js

console.log('Content script loaded');

function assignRandomValues() {

  chrome.storage.sync.get(['assignedValues'], function(result) {
    const assignedValues = result.assignedValues || {};
    console.log(assignedValues)

    Object.entries(assignedValues).forEach(([week, mark]) => {
      const span = document.getElementById('assessment-score-Week ' + week + ' : Assignment ' + week);
      span.innerHTML = `&nbsp;&nbsp;<b>${mark}</b>`;

    });
  });

}

function clearStorage() {
  chrome.storage.sync.clear(function() {
    console.log('Stored data cleared from background script');
  });
}

function getMarks(questions) {
  let incrementBy = 100 / questions;
    // Generate a random number between 6 and 10
    const assignmentMarks = Math.floor(Math.random() * (10 - 6 + 1)) + 6;

    // Calculate the percentage, but ensure it doesn't exceed 100%
    const calculatedPercentage = Math.min(incrementBy * assignmentMarks, 100);

    return calculatedPercentage
}

function modifyMarks(mark,week) {
  // Retrieve assigned values from Chrome storage
  chrome.storage.sync.get(['assignedValues'], function(result) {
    const assignedValues = result.assignedValues || {};
    // console.log(assignedValues)
    
    const span = document.getElementById('assessment-score-Week ' + week + ' : Assignment ' + week);

    assignedValues[`${week}`]=mark;
    
    span.innerHTML = `&nbsp;&nbsp;<b>${mark}</b>`;
  
    chrome.storage.sync.set({ 'assignedValues': assignedValues });
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Received message:', request);

  if (request.action === 'assignRandomValues') {
    console.log("call receove..")
    assignRandomValues();
  }
  if (request.action === 'clearStorage') {
    console.log("call celar..")
    clearStorage();
  }

  if (request.action === 'modifyMarks') {
    const mark = request.mark;
    const week = request.week;
    modifyMarks(mark,week);
  }
});




// console.log('Before adding listener');
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log('Received message:', request);

//   if (request.action === 'assignRandomValues') {
//     console.log("On refresh changing value")
//     const values = {};

//     // Assign random values to specific IDs
//     const spans = document.querySelectorAll('span[id^="assessment-score-"]');
    
//     spans.forEach((span) => {
//       const id = span.id;
//       const randomValue = Math.random() * 100; // Modify this logic as needed
//       values[id] = randomValue;
//       span.innerHTML = `&nbsp;&nbsp;<b>${randomValue.toFixed(1)}</b>`;
//     });

//     // Retrieve existing values from Chrome storage
//     chrome.storage.sync.get(['assignedValues'], function(result) {
//       const existingValues = result.assignedValues || {};

//       // Merge existing values with newly assigned values
//       const updatedValues = { ...existingValues, ...values };

//       // Save the merged values back to Chrome storage
//       chrome.storage.sync.set({ 'assignedValues': updatedValues });
//     });
//   }

//   if (request.action === 'modifyMarks') {
//     const increment = request.increment;

//     // Retrieve assigned values from Chrome storage
//     chrome.storage.sync.get(['assignedValues'], function(result) {
//       const assignedValues = result.assignedValues || {};

//       const spans = document.querySelectorAll('span[id^="assessment-score-"]');
  
//       spans.forEach((span) => {
//         const id = span.id;
//         const currentMark = assignedValues[id] || 0;
//         const newMark = currentMark + increment;
//         assignedValues[id] = newMark;

//         // Save modified values back to Chrome storage
//         chrome.storage.sync.set({ 'assignedValues': assignedValues });

//         span.innerHTML = `&nbsp;&nbsp;<b>${newMark.toFixed(1)}</b>`;
//       });
//     });
//   }
// });
// console.log('After adding listener');


  
/*
let questions = 10;
let incrementBy = 100 / questions;

// Generate a random number between 6 and 10
const assignmentMarks = Math.floor(Math.random() * (10 - 6 + 1)) + 6;

// Calculate the percentage, but ensure it doesn't exceed 100%
const calculatedPercentage = Math.min(incrementBy * assignmentMarks, 100);

console.log("marks ", calculatedPercentage);
*/




