/* IMPORTANT
Right now this script serves as a "master controller" for all other functionalities.
To improve upon this, more script needs to be added so that a group is created each time multiple elements are selected ("e.g. group"). On deselection, destroy the group, unless user chooses to group objects together.
*/


// SELECTION

  //EDGE cases -- DS vs mouse up and down
  //Event delegation vs lots of eventListeners
  //Keeping track of individual instances -- need unique event listeners?

  //Enhance DS
    //-- instantiate group on selecting 2 elements
      //Add resizers to group, not individual elements
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
  if(event.target.matches('.canvas')) { // enable drag select only if clicking on canvas. May need to refactor using ID.
    ds.start();
  }
  else {
    // console.log("target = " + event.target.classList)
    ds.break(); // instead of stop, which removes the selection border. Enhance -- keep .ds-selected class
    // event.target.classList.add('ds-selected'); // to preserve ds selection border. doesn't work. Needs to add to parent. .parent doesn't work either.
  }
}


// On mouse up -- to make compatible with DS
function selectUp() {
  removeClass(); // remove resizers when canvas is clicked
}
/*
  if(event.target.matches('.item')){ //to prevent canvas and resizers to get this class
    event.target.classList.add('ds-selected'); //to enable selection on single click. not needed?
  }


  if(!event.target.closest('ds-selected')){
      addClassDS();
  }else{
    let target = "";
    removeClassDS()
  }
  if(event.target.matches('.canvas')){
    removeClassDS()
  }
}

// DS resizers to selected items
function addClassDS() {
  console.log("add");
  removeClassDS()
  if(event.target.closest('ds-selected')){ //to prevent canvas and resizers to get this class
    console.log("add2"); //why doesn't this fire??
    event.target.classList.add('resizable');
}
}
*/

/*
// Remove all resizers
function removeClassDS(){
  console.log("remove");
  var items = document.querySelectorAll('.item');
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('resizable');
  }
}
*/

//ENHANCE -- Disable resizing unless selected (.ds-selected or .resizable)

//Test cases:
//1 on click of item - PASS
  //1a add resizer - PASS
  //1b remove resizer for other items on click - PASS
  //1c don't remove resizers on 2nd click of itself -
//2 remove all resizers on click of canvas from all items - PASS
//3 DS on all items in selection box
//4 DS on all items with CTRL/SHIFT click
//5 DS unselect on CTRL/SHIFT click

// Make item resizable on click
var elements = document.querySelectorAll('.item');
for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('resizable');
    elements[i].onclick = function (event) {
        if(event.target.classList.contains('.resizable')){
        console.log("ONCLICK");
        //remove resizers from all items
        removeClass();
        }
        if (event.target.innerHTML === this.innerHTML) {
            this.classList.add("resizable");
        }
    }
}

function removeClass(){
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('resizable');
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
