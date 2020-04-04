//https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d

//Add code where border and resizers appear only when element is clicked. Use onClick to add the class "resizeable"?

//BUGFIX: And enable resizers only if they are directly clicked on. Prevent element from being dragged while being resized after selection

function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimum_size = 100; // make dynamic? Set to URL width and height min.
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;

  // Set original width+height and add mouse EventListeners for all divs with resizers
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault();
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })

    // Resize window depending on which resizer is being dragged (runs constantly until stopResize is called)
    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-left')){
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else if (currentResizer.classList.contains('right-only')){
        const width = original_width + (e.pageX - original_mouse_x)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
      }
      else if (currentResizer.classList.contains('left-only')){
        const width = original_width - (e.pageX - original_mouse_x)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-only')) {
        const height = original_height - (e.pageY - original_mouse_y)
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-only')) {
        const height = original_height + (e.pageY - original_mouse_y)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
    }

    // Stop resizing (on mouse up)
    function stopResize() {
      window.removeEventListener('mousemove', resize) //instead of adding/removing event listeners, how about just add/removing CSS classes?
    }
  }
}




// SELECTION
//BUG -- can drag element when dragging canvas
//BUG -- breaks resizing
//BUG -- clicking canvas selects firstChild

//https://codepen.io/bxchang04/pen/abOreoP
// Toggle resizing border and resizers on/off. Called on a parent element for performance reasons.
function toggleDown() {
  if (!event.target.closest('.dragging')){ //bug -- it can drag even if not clicking target
  // if (!this.firstElementChild.classList.contains('.dragging')){
  this.firstElementChild.classList.toggle('dragging');
  }
}

function toggleUp() {
  console.log("toggle")
  console.log("classes = " + event.target.classList)

  makeResizableDiv('.resizable') //moved into toggleUp so that it only runs when a resizeable element is clicked up. But BUG -- only works on second click.

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
