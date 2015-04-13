var socket = io.connect('http://localhost:8000');

var initialized = false;
var fadeLength = 900;

socket.on('initialize', function (percent) {
  showTitle();
  setLinePosition(percent);
  showSides();
  setTimeout(activateControls, 3 * fadeLength);
});

socket.on('update', function(percent) {
  if (initialized) { setLinePosition(percent); }
});

function showTitle() {
  var title = $('#title');

  title.width('40%');
  title.css('left', '30%');
  title.css('top', '18%');

  title.fadeIn(fadeLength);
  title.fadeOut(fadeLength);
}

function showSides() {
  var wait = 2 * fadeLength + 200;
  $('#left').delay(wait).fadeIn(fadeLength);
  $('#right').delay(wait).fadeIn(fadeLength);
  initialized = true;
}

function setLinePosition(percent) {
  $('#left').width(percent + '%');
  $('#right').css('left', percent + '%');
  $('#right').width((100 - percent) + '%');
}

function activateControls() {
  $('#left').click(function() { sendChange(1); });
  $('#right').click(function() { sendChange(-1); });
}

function sendChange(change) {
  socket.emit('change', change);
}
