interact('.resize-drag')
  .draggable({
    // onmove: window.dragMoveListener,
    modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
    })
    ],
    listeners: {
      move: e => {
        document.querySelectorAll('.item[selected]').forEach(function(el, elIndex) {
          let { x, y } = el.dataset;

          x = (+x || 0) + e.dx;
          y = (+y || 0) + e.dy;

          el.style.transform = `translate(${x}px, ${y}px)`;

          Object.assign(el.dataset, { x, y });
        })
      }
    },
  })
  .resizable({
    margin: 10, //size of edges for resizing
    preserveAspectRatio: true,
    edges: {top:false, left:false, bottom:false, right:false},
    modifiers: [
      // keep the edges inside the parent -- not sure what this block does
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 100 } //ENHANCE -- make this a var that is element specific
      })
    ],
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    //ENHANCE -- toggle this only on resize with conditional
      // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
      // remove/untoggle textContent
  });
/*
//Original code for dragging to work
function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
*/

/*
//For adjusting resize border. Breaks multi-drag.
  interact(target).resizable({
    // 2px resizing border
    margin: 1,
  });
*/


// Required for multi drag to work. Conflicts with original code block above.
  const item = document.querySelectorAll('.item');

  item.forEach(el => el.addEventListener('click', e => {
  	e.stopPropagation();
  	e.target.setAttribute('selected', true);
  }));

  document.querySelector('.canvas').addEventListener('click', () => {
  	item.forEach(el => el.removeAttribute('selected'));
  });
