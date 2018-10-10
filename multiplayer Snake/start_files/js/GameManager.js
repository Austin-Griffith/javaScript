

class GameManager {
  constructor() {
    //get canvas stuff

    // this.canvas = document.getElementById("game-canvas") ;
    this.canvas = document.querySelector("#game-canvas") ;  // same as above method but using querySelector
    this.context = this.canvas.getContext('2d') ;
    this.prevTime = 0 ;

    //Snek stuff
    this.sneksArray = [] ;
    this.snekSpeed = 100 ;
    this.snekStepCounter = 0 ;

    //munchie stuff
    this.munchies = [] ;
    this.munchieWindow = 2000 ;
    this.munchieCounter = 0 ;
  }

  init() {
    console.log("gameManager is initialized") ;
    this.sneksArray.push( new Snek( { x: 10, y: 30 } , 'blue ', DIRECTIONS.DOWN ) ) ;
    this.sneksArray.push( new Snek( { x: 10, y: 10 } , 'red ', DIRECTIONS.RIGHT ) ) ;
    window.onkeydown = this.keydown.bind(this) ;
    this.update(0) ;
  }

// cuurentTime is in milli seconds
  update(currentTime) {
    const deltaTime = currentTime - this.prevTime ;
    this.prevTime = currentTime ;
    // console.log(currentTime + ' , ' + deltaTime);
    this.snekStepCounter += deltaTime ;

    if (this.snekStepCounter >= this.snekSpeed) {
      this.sneksArray.forEach( (snek, index) => {
        snek.update() ;
        this.checkCollision(snek, index) 
      }) ;

      this.snekStepCounter = 0 ;
    }

    this.munchieCounter += deltaTime ;
    if (this.munchieCounter >= this.munchieWindow) {
      this.spawnMunchie() ;
      //setting it 0 so every 2 seconds a new one is itterated
      this.munchieCounter = 0 ;
    }

    this.draw() ;
    //this is what make update loop continiously
    requestAnimationFrame( this.update.bind(this) ) ;

  }   //end of update function


    draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) ;

    //forEach takes in a function as an arguement
    this.sneksArray.forEach( (snek) => {
      snek.draw(this.context) ;
    }) ;

    this.munchies.forEach(this.drawMucnhie.bind(this))

  }  //end of draw function

  spawnMunchie() {
    let munchX = (Math.round(Math.random() * 37 ) * 20 + 10) ;
    let munchY = (Math.round(Math.random() * 24 ) * 20 + 10) ;
    //let off here with adding munchies to screen
    this.munchies.push({x: munchX, y: munchY}) ;

  }

  drawMucnhie(position) {
    this.context.fillStyle = "black" ;
    this.context.fillRect(position.x - 5, position.y - 5, 10, 10) ;
  }

  keydown(event) {
    //controls for player one
    if(event.keyCode === KEYS.LEFT && this.sneksArray[0].direction !== DIRECTIONS.RIGHT)
    this.sneksArray[0].direction = DIRECTIONS.LEFT ;

    if(event.keyCode === KEYS.RIGHT && this.sneksArray[0].direction !== DIRECTIONS.LEFT)
    this.sneksArray[0].direction = DIRECTIONS.RIGHT ;

    if(event.keyCode === KEYS.UP && this.sneksArray[0].direction !== DIRECTIONS.DOWN)
    this.sneksArray[0].direction = DIRECTIONS.UP ;

    if(event.keyCode === KEYS.DOWN && this.sneksArray[0].direction !== DIRECTIONS.UP)
    this.sneksArray[0].direction = DIRECTIONS.DOWN ;

    //controls for player two
    if(event.keyCode === KEYS.A && this.sneksArray[1].direction !== DIRECTIONS.RIGHT)
    this.sneksArray[1].direction = DIRECTIONS.LEFT ;

    if(event.keyCode === KEYS.D && this.sneksArray[1].direction !== DIRECTIONS.LEFT)
    this.sneksArray[1].direction = DIRECTIONS.RIGHT ;

    if(event.keyCode === KEYS.W && this.sneksArray[1].direction !== DIRECTIONS.DOWN)
    this.sneksArray[1].direction = DIRECTIONS.UP ;

    if(event.keyCode === KEYS.S && this.sneksArray[1].direction !== DIRECTIONS.UP)
    this.sneksArray[1].direction = DIRECTIONS.DOWN ;

    //other keystroke to test addSegmentToSnek() function
    if (event.keyCode === KEYS.SPACE) {
      this.sneksArray[0].addSegmentToSnek() ;
    }

  }   //end of keydown function

  checkCollision(snek, index) {
    const headPostion = snek.segments[0] ;
    //munchie collosions
    let collideMunchie = -1 ;
    this.munchies.forEach( (munchie, i) => {
      if (headPostion.x === munchie.x && headPostion.y === munchie.y) {
        snek.addSegmentToSnek() ;
        collideMunchie = i ;
      }
    } ) ;

    if (collideMunchie != -1)
    {
      this.munchies.splice(collideMunchie, 1) ;
    }

  }   //end of checkCollision



}
