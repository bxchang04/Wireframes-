/* IMPORTANT
Right now this script serves as a "master controller" for all other functionalities.
To improve upon this, more script needs to be added so that a group is created each time multiple elements are selected ("e.g. group"). On deselection, destroy the group, unless user chooses to group objects together.
*/

// Multi resize
  //Create selection group and superimpose on top. Clicking edges allows for resize that scales all components inside. (Component alignment though?? Test with 2 then 3 components)

// Multi Drag
  //REQUIREMENT -- if more than one component is selected, can drag by clicking-and-dragging
  //HOWEVER, double click on a components bounding box must allow user to modify that component.


// SELECTION

  //EDGE cases -- DS vs mouse up and down
  //Event delegation vs lots of eventListeners
  //Keeping track of individual instances -- need unique event listeners?
  //Awaiting Thimault -- how to hide selection box (e.g. while dragging or resizing)

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

//BUG -- DS selection border flickers on 3-4 quick clicks on selected element.

//BUG -- need to prevent default of web browser URL bar

//BUG: Prevent resizers being cut off on edges (use span?)

// BUG: need to prevent text selection and selection of child elements. @vkomodey "how can i disable text selection while dragging elements" use ignorefrom or a handle

//jQuery solution -- convert to vanilla JS? - http://jsfiddle.net/zVZFq/1445/
//Enhance -- grey background box on selection and drag, like Balsamiq?
//Enhance -- drag select is "overly sensitive." Modify to be more like Balsamiq? (only select if entire element is within selection box)


// Add event listeners for toggling on and off
document.querySelector('.canvas').addEventListener('mousedown', selectDown); //change canvas to ID? And canvas can have only 1 child.
document.querySelector('.canvas').addEventListener('mouseup', selectUp); //change canvas to ID? And canvas can have only 1 child.

// Drag Select
var ds = new DragSelect({
  selectables: document.getElementsByClassName('item'),
  // callback: e => console.log(e),
  area: document.getElementById('canvas'),
  multiSelectKeys: ['ctrlKey', 'shiftKey'],
  autoScrollSpeed: 3,
});


// On mouse down
function selectDown() {
// Disable drag select while dragging -- refactor somehow. Add a controller?
  if(event.target.matches('.canvas')) { // enable drag select only if clicking on canvas. May need to refactor using ID.
    // ds.start(); // deprecated - this breaks ctrl/shift clicking
    //enable resizing -- enhance to make this element specific. Also, this doesn't apply to DS
    ds.selector.removeAttribute("hidden"); // not working. Neither does CSS display = 'none';
    //if ds-selected <= 1
    interact('.resize-drag').draggable({onmove: ""});
    interact('.resize-drag').resizable({edges: { left: false, right: false, bottom: false, top: false } });
  }
  else {
    //disable resizing -- enhance to make this element specific
    ds.selector.setAttribute("hidden", ""); // not working. Neither does CSS display = 'none';
    // console.log(ds.selector);
    interact('.resize-drag').resizable({edges: { left: true, right: true, bottom: true, top: true } });
    // ds.break(); // instead of stop, which removes the selection border. degrecated -- this breaks CTRL/Shift clicking.
    // event.target.classList.add('ds-selected'); // to preserve ds selection border. doesn't work. Needs to add to parent. .parent doesn't work either.
  }
}


// On mouse up -- to make compatible with DS
function selectUp() {
  // removeClass(); // remove resizers when canvas is clicked
  // interact('.resize-drag').resizable({edges: {top:false, left:false, bottom:false, right:false} });

  interact('.resize-drag').draggable({onmove: ""});


  // Add code to destroy selection group here
}

// Add onclick event handler to all items
var elements = document.querySelectorAll('.item');

for (var i = 0; i < elements.length; i++) {
  elements[i].onclick = function (event) {
    // Set event handler to only elements that selected by DS
    console.log("ONCLICK");
    createSelectionGroup();
  }
}


function createSelectionGroup() {
  //make this trigger onClick
  // create the container div
  var dv = document.createElement('div');
  // get all divs
  var divs = document.getElementsByTagName('div');
  // get the body element
  var canvas = document.getElementById('canvas');

  // apply class to container div
  dv.setAttribute('class', 'item selectionGroup');

  // find out all those divs having class ds-selected -- BUG can't do nested divs, and doesn't register ds-onSelected (mouse up can be workaround?)
  for(var i = 0; i < divs.length; i++)
  {
     if (divs[i].getAttribute('class') === '.ds-selected') // doesn't work. Test '.'. Also does this account for multiple classes or does it have to have just 1 class?
     {
        // put the divs having class ds-selected inside container div
        console.log("put");
        dv.appendChild(divs[i]);
     }
  }
  // finally append the container div to body
  canvas.appendChild(dv);

  //test to ensure it doesn't conflict with children 'item'(s). If it does, consider removing class from children.
}

// function to create permanent group
function createGroup() {

}


//Test cases:
//1 on click of item - PASS
  //1a add resizer - PASS
  //1b remove resizer for other items on click - PASS
  //1c don't remove resizers on 2nd click of itself - PASS (with bugs)
//2 remove all resizers on click of canvas from all items - PASS
//3 DS on all items in selection box - PASS
//4 DS on all items with CTRL/SHIFT click - PASS
//5 DS unselect on CTRL/SHIFT click - PASS
//6 resizing enabled only when ds-selected - PASS
//7 hide DS if clicking on an element - FAIL

/*// Select item to make item resizable on click -- basically manual DS for individual selection
var elements = document.querySelectorAll('.item');
for (var i = 0; i < elements.length; i++) {
    // elements[i].classList.remove('ds-selected');
    elements[i].onclick = function (event) {
        if(event.target.classList.contains('.ds-selected')){
          console.log("ONCLICK");
        //remove resizers from all items
        var e = document.querySelectorAll('.item');
        for (var i = 0; i < e.length; i++) {
          // e[i].classList.remove('ds-selected');
        }
        removeClass();
        }
        if (event.target.innerHTML === this.innerHTML) {
            // this.classList.add("ds-selected");
        }
    }
}

function removeClass(){
  for (var i = 0; i < elements.length; i++) {
    // elements[i].classList.remove('ds-selected');
  }
}
*/
