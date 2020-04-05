//https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging
//Why does this use ID and not class? Performance. But why doesn't querySelector work here?

function drag_div(div){
  var mousePosition;
  var offset = [0,0];
  var isDown = false;

  div = document.getElementById(div); //querySelector doesn't seem to work here. Performance is better by ID (but will it work on multi-select??)

  // if(event.target.matches('dragging')) { //buggy (end bracket below)
  // if(div.classList.contains('dragging')) { //buggy (end bracket below)
  document.addEventListener('mousedown', function(e) { //vs div.?
      isDown = true;
      offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
      ];
    }, true);
  document.addEventListener('mouseup', function() { //vs div.?
      isDown = false;
  }, true);

  document.addEventListener('mousemove', function(event) { //vs div.?
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
  }, true);
  // } //buggy
}

// drag_div('draggable'); // call this in resize.js using the toggleDown functino (selection)
// drag_div('canvas');
