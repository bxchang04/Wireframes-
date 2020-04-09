/* IMPORTANT
Right now this script serves as a "master controller" for all other functionalities.
To improve upon this, more script needs to be added so that a group is created each time multiple elements are selected ("e.g. group"). On deselection, destroy the group, unless user chooses to group objects together.
*/


// SELECTION

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

//BUG -- DS selection border dissappears on click up on selected element.

//BUG -- need to prevent default of web browser URL bar

//BUG: Prevent resizers being cut off on edges (use span?)

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
    // event.target.classList.add('ds-selected'); // to preserve ds selection border. doesn't work. Needs to add to parent. .parent doesn't work either.
  }
}

// On mouse up
function selectUp() {
/*  target = "";

  /
  // If selected element is active, bail
  if (event.target.closest('.resizable')) return;

  // Unselect all elements, then select target
  var elements = document.querySelectorAll('.item');

  // Remove resizers from all, then add resizers to target
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('resizable');
    elements[i].onclick = function (event) {
      removeClassDS();
      if (event.target.innerHTML === this.innerHTML) {
        // console.log("add resizers");
        addClassDS();
        // this.classList.add("resizable"); //adding to event.target introduces visual bug
      }
    }
  }

  if (!event.target.closest('.resizable')) {
    // console.log("remove resizers");
    removeClassDS();
  }*/
  addClassDS();

  var canvas = document.querySelectorAll('.canvas');
  if(event.target === canvas){
    removeClassDS();
  }
}

function addClassDS() {
  // DS add resizer to one
  console.log(ds.getSelection());
  var dsSelected = document.querySelectorAll('.ds-selected');
  for (var i = 0; i < dsSelected.length; i++) {
    dsSelected[i].classList.add('resizable');
  }
}

// Remove all resizers
/*function removeClass(){
  var elements = document.querySelectorAll('.item');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('active');
  }
  var dsSelected = document.querySelectorAll('.ds-selected');
  for (var i = 0; i < dsSelected.length; i++) {
    dsSelected[i].classList.remove('resizable');
  }
}*/

// Remove all resizers
function removeClassDS(){
  var dsSelected = document.querySelectorAll('.ds-selected');
  for (var i = 0; i < dsSelected.length; i++) {
    dsSelected[i].classList.remove('resizable');
  }
}



// Add event listeners for toggling on and off
document.querySelector('.canvas').addEventListener('mousedown', selectDown); //change canvas to ID? And canvas can have only 1 child.
document.querySelector('.canvas').addEventListener('mouseup', selectUp); //change canvas to ID? And canvas can have only 1 child.

// Drag Select
var ds = new DragSelect({
  selectables: document.getElementsByClassName('item'),
  // callback: e => console.log(e),
  // callback: r => r.classList.add("resizable"),
  area: document.getElementById('canvas'),
  multiSelectKeys: ['ctrlKey', 'shiftKey'],
  autoScrollSpeed: 3
});
