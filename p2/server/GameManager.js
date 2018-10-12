
const getRandomColor = require('./RandomColor') ;
const Snek = require('./Snek')
const { DIRECTIONS } = require('./Constants')

class GameManager {
  constructor(io) {

    this.io = io ;
    // Initialize canvas and drawing context.

    // this.canvas = document.getElementById('game-canvas')
    // this.context = this.canvas.getContext('2d');
    this.prevTime = 0;

    this.isGameOver = false;
    this.winnerIndex = 0;

    // Initialize snek stuff
    this.sneks = [];
    this.snekSpeed = 100;
    this.snekStepCounter = 0;

    // munchie stuff
    this.munchies = [];
    this.munchieWindow = 2000;
    this.munchieCounter = 0;

    // update buffer
    this.updateBuffer = 0 ;
    this.updateBufferMax = 50 ;
  }

  /**
   * Setup
   */
  init() {

    this.io.on('connection' , socket => {
      console.log("NEW PLAYER: ", socket.id) ;

    this.sneks.push(
      new Snek(
        socket.id,
        { x: 10, y: 10 }, DIRECTIONS.RIGHT, 37, 24, getRandomColor() ),
      ) ;

      socket.on('playerInput', direction => {
        const properSnek = this.sneks.find(s => s.socketId === socket.id ) ;
        console.log("we have hit this event") ;
        if (properSnek) {
          this.processInput(properSnek, direction) ;
        }
      }) ;

       socket.on('disconnect', () => {
         this.sneks = this.sneks.filter(s => s.socketId !== socket.id ) ;
       }) ;
    });
    // Starts Updating and renderign the game.
    this.update(0);

  }   // end of init() function

  /**
   * Run the updates for the game state, then draw
   * @param {*} Date.now() : millis
   */

  update() {

    const deltaTime = Date.now() - this.prevTime;
    this.prevTime = Date.now();

    // Update sneks if it's time to move
    this.snekStepCounter += deltaTime;
    if (this.snekStepCounter >= this.snekSpeed) {
      this.sneks.forEach((snek) => {
        snek.update();
      });

      this.snekStepCounter = 0;
    }

    // Create munchie after time window passes
    this.munchieCounter += deltaTime;
    if (this.munchies.length < 10 && this.munchieCounter >= this.munchieWindow) {
      this.spawnMunchie();
      this.munchieCounter = 0;
    }

    this.updateBuffer += deltaTime;
    if (this.updateBuffer >= this.updateBufferMax) {
      this.broadcast() ;
      this.updateBuffer = 0 ;
    }


    //need setImmediate for Node.js  -->  no requestAnimationFrame in node
    setImmediate( this.update.bind(this) ) ;
  }

  /**
   * Spawns a munchie at a random position on the grid
   */
  spawnMunchie() {
    let munchX = Math.round(Math.random() * 37)  ;
    let munchY = Math.round(Math.random() * 24)  ;

    this.munchies.push({ x: munchX, y: munchY });
  }

  processInput(snek, direction) {
    if (direction === DIRECTIONS.LEFT && snek.direction !== DIRECTIONS.RIGHT ) {
      snek.direction = DIRECTIONS.LEFT ;
    }

    if (direction === DIRECTIONS.RIGHT && snek.direction !== DIRECTIONS.LEFT ) {
      snek.direction = DIRECTIONS.RIGHT ;
    }

    if (direction === DIRECTIONS.UP && snek.direction !== DIRECTIONS.DOWN ) {
      snek.direction = DIRECTIONS.UP ;
    }

    if (direction === DIRECTIONS.DOWN && snek.direction !== DIRECTIONS.UP ) {
      snek.direction = DIRECTIONS.DOWN ;
    }


  }

  broadcast() {
    const state = {
      sneks: this.sneks.map(s => s.serialize() ),
      munchies: this.munchies,
    }
    this.io.sockets.emit('update', state)
  }

}   // end of GameManager

module.exports = GameManager ;
