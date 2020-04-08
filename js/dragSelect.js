//Original -- do not update!

var ds = new DragSelect({
  selectables: document.getElementsByClassName('item'),
  callback: e => console.log(e),
  area: document.getElementById('container'),
  multiSelectKeys: ['ctrlKey', 'shiftKey'],  // special keys that allow multiselection.
  autoScrollSpeed: 3  // Speed in which the area scrolls while selecting (if available). Unit is pixel per movement. Set to 0 to disable autoscrolling. Default = 1
});
