

const {DIRECTIONS} = require('./Constants.js') ;

class Snek {
  constructor(socketId, initialPosition, initialDirection, worldWidth, worldHeight, color) {
    this.size = 20;
    this.sizeOffset = this.size / 2;
    this.segments = [initialPosition, initialPosition]; // [{ x: num, y: num }]
    this.direction = initialDirection;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.color = color;
    this.socketId = socketId ;
    this.isDead = false;
  }

  update() {
    //console.log('step') ;

    this.segments = this.segments.map((position, index) => {
      if (index === 0) {
        let newX = position.x;
        let newY = position.y;

        if (this.direction === DIRECTIONS.LEFT) {
          newX = position.x - 1;
          if (newX < 0) newX = this.worldWidth ;
        }
        if (this.direction === DIRECTIONS.UP) {
          newY = position.y - 1;
          if (newY < 0) newY = this.worldHeight ;
        }
        if (this.direction === DIRECTIONS.RIGHT) {
          newX = position.x + 1;
          if (newX > this.worldWidth) newX = 0 ;
        }
        if (this.direction === DIRECTIONS.DOWN) {
          newY = position.y + 1;
          if (newY > this.worldHeight) newY = 0 ;
        }
        return { x: newX, y: newY };
      }
      return this.segments[index - 1];
    });
  }

  // Adds a segment to the end of the snek
  addSegment() {
    const tailSegment = this.segments[this.segments.length - 1];

    this.segments.push({
      x: tailSegment.x,
      y: tailSegment.y,
    });
  }

  serialize() {
    return {
      color: this.color,
      segments: this.segments
    }
  }


}     // end of class


module.exports = Snek ;
