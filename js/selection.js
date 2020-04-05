// SELECTION
//Major bug -- draggable and resize conflict. Try using a class called 'enabled'? Or set a global variable 'resizing' and only allow dragging when it's false. Try taking out the ID.
//BUG -- can drag element when dragging canvas
//BUG -- dragging fails on first try

//https://codepen.io/bxchang04/pen/abOreoP
// Toggle resizing border and resizers on/off. Called on a parent element for performance reasons.
function toggleDown() {
  if (!event.target.closest('.dragging')){ //bug -- it can drag even if not clicking target
  drag_div('draggable');
  }
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
}

// Add event listeners for toggling on and off
document.querySelector('.canvas').addEventListener('mousedown', toggleDown); //change canvas to ID? And canvas can have only 1 child.
document.querySelector('.canvas').addEventListener('mouseup', toggleUp); //change canvas to ID? And canvas can have only 1 child.
