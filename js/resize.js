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
      window.removeEventListener('mousemove', resize)
    }
  }
}

makeResizableDiv('.resizable') //modify this to only run when a resizeable element is clicked on

//https://codepen.io/bxchang04/pen/abOreoP
// Toggle resizing border and resizers on/off

//FIX: Modify toggle off so that it only toggles off when clicking on any other object, and not itself!
function classToggle() {
    this.classList.toggle('resizable__off');
    this.classList.toggle('resizable');
    document.querySelector('.resizable__off').removeEventListener('click', classToggle); // why does this allow me to click one more time. Capture vs. bubble?
}

document.querySelector('.resizable__off').addEventListener('click', classToggle);
