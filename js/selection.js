/* IMPORTANT
Right now this script serves as a "master controller" for all other functionalities.
To improve upon this, more script needs to be added so that a group is created each time multiple elements are selected ("e.g. group"). On deselection, destroy the group, unless user chooses to group objects together.
*/


// SELECTION

  //Remove all reference to resizer.js
  //Enhance DS -- toggle resizer on selecting 1 element
  //Enhance DS
    //-- instantiate group on selecting 2 elements
    //-- instantiate group on selecting 3 elements
  //Toggle resizers for group

//Multi-drag
  //Implement grouping first. Then apply select only to group. Then turn off resizers and turn on for new group. Then implement dragging only for group.
  //Enhance -- save group div if user chooses to do so. Otherwise destroy the group div.

//Multi-resizer
  //instantiate resizers on group. Then resize group and scale elements inside (font sizes stay the same)

//BUG -- need to prevent default of web browser URL bar

//BUG: Prevent resizers being cut off on edges (use span?)

//Enhance -- multi-drag -- modify dNd so that it accepts selection from DS.
  //Enhance -- selection -- replace all instances of firstElementChild. Then test with something other than browser.
  //https://stackoverflow.com/questions/5677993/how-do-i-drag-multiple-elements-at-once-with-javascript-or-jquery - (possible work around) Put your items into some container and make this container draggable. You will need to set handle option to be a class of your item element. Also you will need to recalculate items position after drag. And obviously when you deselect items you have to take them from this container and put back to their origin.
  //jQuery solution -- convert to vanilla JS? - http://jsfiddle.net/zVZFq/1445/
//Enhance -- grey background box on selection and drag, like Balsamiq?
//Enhance -- drag select is "overly sensitive." Modify to be more like Balsamiq? (only select if entire element is within selection box)

// On mouse down
function selectDown() {
// Disable drag select while dragging -- refactor somehow. Add a controller?
  if (event.target.matches('.canvas')) { // enable drag select only if clicking on canvas. May need to refactor using ID.
    ds.start();
  }
  else {
    // console.log("target = " + event.target.classList)
    ds.break(); // instead of stop, which removes the selection border. Enhance -- keep .ds-selected class
    //this.classList.add('.ds-selected'); // doesn't work. Is supposed to preserve selection box.
  }
}

// On mouse up
function selectUp() {
  // Unselect all elements, then select target
  var elements = document.querySelectorAll('.item');

  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('resizable');
    elements[i].onclick = function (event) {
      //remove all active class
      removeClass();
      if (event.target.innerHTML === this.innerHTML) {
        console.log("add resizers");
        this.classList.add("resizable");
      }
    }
    // makeResizableDiv('.resizable') //moved into toggleUp so that it only runs when a resizeable element is clicked up. No longer needed
  }

  if (!event.target.closest('.resizable')) {
    console.log("remove resizers");
    removeClass();
  }
}

// Remove all resizers
function removeClass(){
  var elements = document.querySelectorAll('.item');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('active');
  }
}


// Add event listeners for toggling on and off
document.querySelector('.canvas').addEventListener('mousedown', selectDown); //change canvas to ID? And canvas can have only 1 child.
document.querySelector('.canvas').addEventListener('mouseup', selectUp); //change canvas to ID? And canvas can have only 1 child.

// Drag Select
var ds = new DragSelect({
  selectables: document.getElementsByClassName('item'),
  // callback: e => console.log(e),
  area: document.getElementById('canvas'),
  multiSelectKeys: ['ctrlKey', 'shiftKey'],
  autoScrollSpeed: 3
});
