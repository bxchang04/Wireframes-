/* IMPORTANT
Right now this script serves as a "master controller" for all other functionalities.
To improve upon this, more script needs to be added so that a group is created each time multiple elements are selected ("e.g. group"). On deselection, destroy the group, unless user chooses to group objects together.
*/


// SELECTION
//BUG (SEVERE) -- draggable and resize conflict. Try using a class called 'enabled'? Or set a global variable 'resizing' and only allow dragging when it's false. Try taking out the ID or using something to replace it.

  //Fix -- Implement grouping first. Then apply select only to group. Then turn off resizers and turn on for new group. Then implement dragging only for group.
  //Enhance -- save group div if user chooses to do so. Otherwise destroy the group div.

//BUG - A - resizers won't appear on both elements. Caused by secondElementChild calls and possibly 2 draggable IDs.

//Enhance -- Don't hardcode draggable objects. Instead, add ID "draggable[i]" using for loop, and use for loop in dnd.js. (This may not work since two items with the same ID don't seem to be draggable)
//Enhance -- Change Z value of object being dragged (z=999?).

//BUG - A - Resizers buggy (TL, L, BL, T, TR) -- conflicts with dragNdrop script.

//BUG -- clicking up on selected element again should not remove selection border (.ds-selected in dragSelect.js) on second click (leaves resizers).

//BUG -- drag and drop -- on mouse up, element has classes dragNdrop--start and dragNdrop--stop. May cause bugs.

//BUG -- flickers if selected item is clicked quickly and >2 times. .ds-selected is removed? (Doesn't happen for resizers border, only DS)

//BUG: Prevent resizers from being cut off

//Enhance -- multi-drag -- modify dNd so that it accepts selection from DS.
  //Enhance -- selection -- replace all instances of firstElementChild. Then test with something other than browser.
  //https://stackoverflow.com/questions/5677993/how-do-i-drag-multiple-elements-at-once-with-javascript-or-jquery - (possible work around) Put your items into some container and make this container draggable. You will need to set handle option to be a class of your item element. Also you will need to recalculate items position after drag. And obviously when you deselect items you have to take them from this container and put back to their origin.
  //jQuery solution -- convert to vanilla JS? - http://jsfiddle.net/zVZFq/1445/
//Enhance -- grey background box on selection and drag, like Balsamiq?
//Enhance -- drag select is "overly sensitive." Modify to be more like Balsamiq? (only select if entire element is within selection box)

function selectDown() {

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

function selectUp() {
  // If closest element to click is an already selected element, bail
  if (event.target.closest('.resizable')) return

  // Otherwise if element clicked is not already selected, select
  if (!event.target.closest('.resizable')) {
    this.firstElementChild.classList.add('resizable'); // has to be before makeResizableDiv function call.
    // this.secondElementChild.classList.add('resizable'); // has to be before makeResizableDiv function call. Not working, and breaks resizing.
    makeResizableDiv('.resizable') //moved into toggleUp so that it only runs when a resizeable element is clicked up.
  }

  // If element clicked is not the currently selected object, unselect
  if (!event.target.closest('.resizable')) {
    this.firstElementChild.classList.remove('resizable');
    // this.secondElementChild.classList.remove('resizable');
  }
}
// Add event listeners for toggling on and off
document.querySelector('.canvas').addEventListener('mousedown', selectDown); //change canvas to ID? And canvas can have only 1 child.
document.querySelector('.canvas').addEventListener('mouseup', selectUp); //change canvas to ID? And canvas can have only 1 child.

// Drag Select

var ds = new DragSelect({
  selectables: document.getElementsByClassName('item'),
  area: document.getElementById('canvas'),
  multiSelectKeys: ['ctrlKey', 'shiftKey'],
  autoScrollSpeed: 3
});
