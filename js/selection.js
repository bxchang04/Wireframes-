// SELECTION
//BUG (SEVERE) -- draggable and resize conflict. Try using a class called 'enabled'? Or set a global variable 'resizing' and only allow dragging when it's false. Try taking out the ID or using something to replace it.

//BUG - A - Resizers broken (TL, L, BL, T, TR)

//BUG -- clicking up on selected element again should not remove selection border (.ds-selected in dragSelect.js) on second click (leaves resizers).

//BUG -- drag and drop -- on mouse up, element has classes dragNdrop--start and dragNdrop--stop. May cause bugs.

//BUG -- flickers if selected item is clicked quickly and >2 times. .ds-selected is removed?

//BUG: Prevent resizers from being cut off

//Enhance -- multi-drag -- modify dNd so that it accepts selection from DS.
  //Enhance -- selection -- replace all instances of firstElementChild. Then test with something other than browser.
//Enhance -- grey background box on selection and drag, like Balsamiq?
//Enhance -- drag select is "overly sensitive." Modify to be more like Balsamiq? (only select if entire element is within selection box)

//https://codepen.io/bxchang04/pen/abOreoP
// Toggle resizing border and resizers on/off. Called on a parent element for performance reasons.



function toggleDown() {

// Disable drag select while dragging -- refactor somehow. Add a controller?
  if (event.target.matches('.canvas')) { // enable drag select only if clicking on canvas. May need to refactor using ID.
    ds.start();
  }
  else {
    console.log("target = " + event.target.classList)
    ds.break(); // instead of stop, which removes the selection border. Enhance -- keep .ds-selected class
    //this.classList.add('.ds-selected'); // doesn't work. Is supposed to preserve selection box.
  }
}

function toggleUp() {
  // If closest element to click is an already selected element, bail
  if (event.target.closest('.resizable')) return

  // Otherwise if element clicked is not already selected, select
  if (!event.target.closest('.resizable')) {
    this.firstElementChild.classList.add('resizable'); // has to be before makeResizableDiv function call.
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

// Drag Select

var ds = new DragSelect({
  selectables: document.getElementsByClassName('item'),
  area: document.getElementById('canvas'),
  multiSelectKeys: ['ctrlKey', 'shiftKey'],
  autoScrollSpeed: 3
});
