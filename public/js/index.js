(() => {
  var mousePressed = false;
  var lastX, lastY;
  var canvas = $('#trimapCanvas');
  var ctx = canvas[0].getContext('2d');
  var clearButton = $('#clearTrimap');
  var postButton = $('#postButton');
  const mouseDownHandler = function (e) {
    mousePressed = true;
    let x = e.pageX - $(this).offset().left;
    let y = e.pageY - $(this).offset().top;
    draw(x, y, false);
  };

  const mouseMoveHandler = function (e) {
    if (mousePressed) {
      let x = e.pageX - $(this).offset().left;
      let y = e.pageY - $(this).offset().top;
      draw(x, y, true);
    }
  };

  const mouseUpHandler = function () {
    mousePressed = false;
  };

  const draw = (x, y, isDown) => {
    if (isDown) {
      ctx.beginPath();
      ctx.strokeStyle = $('#colorSelect').val();
      ctx.lineWidth = $('#lineSelect').val();
      ctx.lineJoin = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
    lastX = x; lastY = y;
  };

  const clearTrimap = function () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const postToServer = function () {
    var dataURL = canvas[0].toDataURL();
    $.ajax({
      type: "POST",
      url: "telescope",
      data: {
        imgBase64: dataURL
      }
    }).done(function (o) {
      console.log('saved');
    });
  };

  canvas.on({
    mousedown: mouseDownHandler,
    mouseup: mouseUpHandler,
    mousemove: mouseMoveHandler
  });

  clearButton.click(clearTrimap);

  postButton.click(postToServer);
})();