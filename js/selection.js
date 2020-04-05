// SELECTION
//Major bug -- draggable and resize conflict. Try using a class called 'enabled'? Or set a global variable 'resizing' and only allow dragging when it's false. Try taking out the ID.
//BUG -- can drag element when dragging canvas
//BUG -- can't unselect by clicking canvas
//BUG -- dragging fails on first try
//BUG -- mouseUp after drag select firstChild

//https://codepen.io/bxchang04/pen/abOreoP
// Toggle resizing border and resizers on/off. Called on a parent element for performance reasons.
function toggleDown() {
  if (!event.target.closest('.dragging')){ //bug -- it can drag even if not clicking target
  // if (!this.firstElementChild.classList.contains('.dragging')){
  this.firstElementChild.classList.toggle('dragging');
  drag_div('draggable');
  }
}

function toggleUp() {
  console.log("toggle")
  console.log("classes = " + event.target.classList)

  // if (!event.target.matches('.dragging')) { //doesn't work -- should prevent selection after drag
    makeResizableDiv('.resizable') //moved into toggleUp so that it only runs when a resizeable element is clicked up. But BUG -- only works on second click.
  // }
  this.firstElementChild.classList.toggle('dragging');

  // If closest element to click is an already selected element, bail
  if (event.target.closest('.resizable')) return

  // Otherwise if element clicked is not selected, select
  // if (event.target.classList.contains('.resizable__off')) {
    this.firstElementChild.classList.toggle('resizable');
  // }
}

// Add event listeners for toggling on and off
document.querySelector('.canvas').addEventListener('mousedown', toggleDown); //change canvas to ID? And canvas can have only 1 child.
document.querySelector('.canvas').addEventListener('mouseup', toggleUp); //change canvas to ID? And canvas can have only 1 child.
