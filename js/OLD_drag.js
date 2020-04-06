//https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging

//DISABLED due to bugginess

//Why does this use ID and not class? Performance. But why doesn't querySelector work here?

//Refactor - try changing div from 'draggable' to 'canvas' so that this can be consistent with resize.js (Event delegation vs. listening for events).

function drag_div(div){
  var mousePosition;
  var offset = [0,0];
  var isDown = false;

  div = document.getElementById(div); //querySelector doesn't seem to work here. TryPerformance is better by ID (but will it work on multi-select??)

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
}
