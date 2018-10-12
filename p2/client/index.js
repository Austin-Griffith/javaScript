
let socket ;
let gameState = { sneks: [], munchies: [] } ;
let canvas ;
let context ;


window.onload = function () {
  socket = io() ;
  socket.on('update', data => {
    //console.log(data) ;
    gameState = data ;
  });
  
  socket.emit('newPlayer');
  canvas = document.querySelector('canvas') ;
  context = canvas.getContext('2d') ;
  window.onkeydown = keydown ;
  update() ;
}

function update() {
//console.log(canvas);
    draw(context, canvas, gameState) ;
    requestAnimationFrame(update) ;
}

function keydown(e)
  {
    // Player one
    if (e.keyCode === KEYS.LEFT ) {
      socket.emit('playerInput', DIRECTIONS.LEFT) ;
    }
    if (e.keyCode === KEYS.UP ) {
      socket.emit('playerInput', DIRECTIONS.UP) ;
    }
    if (e.keyCode === KEYS.RIGHT ) {
      socket.emit('playerInput', DIRECTIONS.RIGHT) ;
    }
    if (e.keyCode === KEYS.DOWN ) {
      socket.emit('playerInput', DIRECTIONS.DOWN) ;
    }
    // Other keystrokes
    // if (e.keyCode === KEYS.SPACE) {
    //   this.sneks[0].addSegment();
  }
