

class Snek {
  /**
  *
  * @param initialPosition : { x: num , y: num }
  */

  constructor(initialPosition , color, initialDirection) {
    this. size = 20 ;
    this.sizeOffset = this.size / 2 ;
    this.segments = [initialPosition, initialPosition] ;      /// {x: numX, y: numY}
    this.color = color ;
    //temp
    this.direction = initialDirection ;
    this.worldWidth = 760 ;
    this.worldHeight = 500 ;
    this.isDead = false ;
  }

  update() {
    // console.log('LOOK AT ME');

    //map function creates a new array so need to reassign the old array of segments
    this.segments = this.segments.map((position, index) => {

      if (index === 0) {
        let newX = position.x ;
        let newY = position.y ;

        if (this.direction === DIRECTIONS.UP ) {
          newY = position.y - this.size ;
          if (newY < 0 ) newY = this.worldHeight + this.sizeOffset ;
        }

        if (this.direction === DIRECTIONS.DOWN ) {
          newY = position.y + this.size ;
          if (newY > this.worldHeight ) newY = 0 + this.sizeOffset ;
        }

        if (this.direction === DIRECTIONS.RIGHT ) {
          newX = position.x + this.size ;
          if (newX > this.worldWidth ) newX = 0 + this.sizeOffset ;
        }

        if (this.direction === DIRECTIONS.LEFT ) {
          newX = position.x - this.size ;
          if (newX < 0 ) newX = this.worldWidth - this.sizeOffset ;
        }

        return {x: newX, y: newY }
      }
      else{
        return this.segments[index - 1] ;
      }

    });
  }

  draw(context) {
    this.segments.forEach(position => {
      this.drawSegment(context, position)
    }) ;
  }

  drawSegment(context, position) {
    context.fillStyle = this.color ;
    context.fillRect(
      position.x - this.sizeOffset,
      position.y - this.sizeOffset,
      this.size,
      this.size
    ) ;
  }

  addSegmentToSnek() {
    // const numberOfSegments = this.segments.length ;
    const tailSegment = this.segments[this.segments.length - 1]
    this.segments.push({x: tailSegment.x, y: tailSegment.y})
  }

}
