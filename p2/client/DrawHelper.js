
const snekSize = 20 ;

function drawSnek(context, snek) {
  snek.segments.forEach(position => {
    context.fillStyle = snek.color ;
    context.fillRect(
      position.x * snekSize + snekSize / 2,
      position.y * snekSize + snekSize / 2,
      snekSize,
      snekSize
    );
  }) ;
}

function drawMunchie(context, position) {
  context.fillStyle = 'black';
  context.fillRect(position.x * 20 + 5, position.y * 20 + 5, 10, 10);
}


/**
 * Draw all elements of the game
 */
 function draw(context, canvas, state) {

    context.clearRect(0, 0, canvas.width, canvas.height);

    const sneks = state.sneks ;
    const munchies = state.munchies

    // Draw each snake
    sneks.forEach((snek) => {
      drawSnek(context, snek);
    });

    munchies.forEach( position => {
      drawMunchie(context, position);
    });
}
