// The Road class
class Road {

  // The constructor for the Road object
  constructor(x, width, laneCount = 3) {

    // The x-coordinate, width and lane count for the road
    this.x = x;
    this.width = width
    this.laneCount = laneCount;

    // The left and right dimensions of the road
    this.left = x - width / 2;
    this.right = x + width / 2;

    // The top and bottom dimensions of the road
    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    // Store the top left, top right, bottom left and bottom right borders of the road
    const topLeft = {x: this.left, y: this.top};
    const topRight = {x: this.right, y: this.top};
    const bottomLeft = {x: this.left, y: this.bottom};
    const bottomRight = {x: this.right, y: this.bottom};

    // Set the border for the road
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight]
    ];
  }


  // This method gets the center coordinate of a given lane number
  getLaneCenter(laneIndex) {

    // Calculate the width of the lane
    const laneWidth = this.width / this.laneCount;

    // Return the center of the given lane
    // If the lane index exceeds the number of lanes, use Math.min to return the center of the rightmost lane
    return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth;
  }


  // This method draws the road
  // It takes a canvas as an argument
  draw(ctx) {

    // Set the line width and stroke style
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    // Draw the dashed lane lines using a for loop
    // The number of lanes is stored in the laneCount property
    for (let i = 1; i <= this.laneCount - 1; i++) {

      // Use linear interpolation function to calculate x
      const x = lerp(
        this.left,
        this.right,
        i / this.laneCount
      );

      // Set a line dash of length 20 pixels, and a break of 20 pixels
      ctx.setLineDash([20, 20]);

      // Draw a vertical line on the road
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

    // Don't add a line dash for the outermost lines
    ctx.setLineDash([]);

    // Draw the borders (outermost lines) for the road
    this.borders.forEach(border => {

      // Use the border property to get the x and y coordinates for the border
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
