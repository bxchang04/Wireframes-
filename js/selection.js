// SELECTION
//BUG (SEVERE) -- draggable and resize conflict. Try using a class called 'enabled'? Or set a global variable 'resizing' and only allow dragging when it's false. Try taking out the ID or using something to replace it.
//BUG -- can drag element when dragging canvas
//BUG -- dragging fails on first try

//Enhance -- grey background box on selection and drag, like Balsamiq?

//https://codepen.io/bxchang04/pen/abOreoP
// Toggle resizing border and resizers on/off. Called on a parent element for performance reasons.
function toggleDown() {
  drag_div('draggable'); //bugfix - try using 'canvas' instead and modify drag.js to use firstElementChild
  this.firstElementChild.classList.add('dragging'); //currently not in use
}

function toggleUp() {
  // If closest element to click is an already selected element, bail
  if (event.target.closest('.resizable')) return

  // Otherwise if element clicked is not already selected, select
  if (!event.target.closest('.resizable')) {
    this.firstElementChild.classList.add('resizable');
    makeResizableDiv('.resizable') //moved into toggleUp so that it only runs when a resizeable element is clicked up. But BUG -- only works on second click.
  }

  // If element clicked is not the currently selected object, unselect
  if (!event.target.closest('.resizable')) {
    this.firstElementChild.classList.remove('resizable');
  }

  this.firstElementChild.classList.remove('dragging'); //currently not in use
}
// Add event listeners for toggling on and off
document.querySelector('.canvas').addEventListener('mousedown', toggleDown); //change canvas to ID? And canvas can have only 1 child.
document.querySelector('.canvas').addEventListener('mouseup', toggleUp); //change canvas to ID? And canvas can have only 1 child.
