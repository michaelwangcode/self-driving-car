// The Car class
class Car {

  // The constructor for creating a Car object
  constructor(x, y, width, height) {

    // Set the coordinates and dimensions of the car
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Set the speed, acceleration, max speed and friction for the car
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;

    // Set the angle of the car
    this.angle = 0;

    // Store whether the car is damaged or not
    this.damaged = false;

    // Create a Sensor object (and pass the car as the argument)
    this.sensor = new Sensor(this);

    // Initialize a Controls object
    this.controls = new Controls();
  }



  // The update method performs actions based on the controls object
  // Take the road borders as an argument
  update(roadBorders) {

    // As long as the car is not damaged, allow it to move
    if (!this.damaged) {

      // Call the move method to move the car
      this.#move();

      // Add the four corners of the car
      this.polygon = this.#createPolygon();

      // Call the assessDamage function to see if the car is damaged
      // It takes the roadBorders as an argument
      this.damaged = this.#assessDamage(roadBorders);
    }

    // Tell the sensor to update
    // Pass the road borders as an argument
    this.sensor.update(roadBorders);
  }



  // This function checks to see if the car is damaged
  // A car gets damaged when it touches the side of the road (or another car)
  #assessDamage(roadBorders) {

    // Loop through the road borders
    for (let i = 0; i < roadBorders.length; i++) {

      // Use the polysIntersect function (in utils.js) 
      // to see if there is an intersection between the car and the road borders
      if (polysIntersect(this.polygon, roadBorders[i])) {

        // If they intersect, return true for damage
        return true;
      }
    }

    // Otherwise, return false for not damaged
    return false;
  }



  // This method keeps track of the coordinates of the car (the four corners)
  // The '#' means the method is a private method
  #createPolygon() {

    // Store the points for the car (one for each corner)
    const points = [];

    // The radius is the distance from the center of the car to a corner
    const rad = Math.hypot(this.width, this.height) / 2;

    // Alpha is the angle between the radius and the line that splits the car in half vertically
    const alpha = Math.atan2(this.width, this.height);

    // Add the top right point of the car to the points array
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad
    });

    // Add the top left point of the car to the points array
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad
    });

    // Add the bottom right point of the car to the points array
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
    });

    // Add the bottom left point of the car to the points array
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
    });

    // Return the points array
    return points;
  }



  // The move method moves the car
  // It is called in the update function above
  // The '#' means the method is a private method
  #move() {

    //----- MOVING FORWARDS AND BACKWARDS -----//

    // If the controls are forward, move the car up
    if (this.controls.forward) {

      // The car's speed increases by the acceleration value
      this.speed += this.acceleration;
    }

    // If the controls are reverse, move the car down
    if (this.controls.reverse) {

      // The car's speed decreases by the acceleration value
      this.speed -= this.acceleration;
    }

    // When the car is going forward:
    // If the speed exceeds a max speed,
    if (this.speed > this.maxSpeed) {

      // Set the speed to the max speed
      this.speed = this.maxSpeed;
    }

    // When the car is in reverse:
    // If the speed exceeds half the max speed,
    if (this.speed < -this.maxSpeed / 2) {

      // Set the speed to half the max speed
      this.speed = -this.maxSpeed / 2;
    }

    // If the speed is greater than 0,
    if (this.speed > 0) {

      // Decrease the speed by the friction
      this.speed -= this.friction;
    }

    // If the speed is less than 0,
    if (this.speed < 0) {

      // Increase the speed by the friction
      this.speed += this.friction;
    }
    
    // Prevent the car from moving when no key is pressed:
    // If the magnitude of the speed is less than the friction,
    if (Math.abs(this.speed) < this.friction) {

      // Set the speed to 0
      this.speed = 0;
    }

    //----- TURNING LEFT AND RIGHT -----//


    // If the car is moving,
    if (this.speed != 0) {

      // If the car is moving backwards, reverse the direction of the controls
      // The "flip" value will be -1 if the car is moving backwards
      const flip = this.speed > 0 ?  1 : -1;

        // If the controls are left,
        if (this.controls.left) {

          // Rotate the car left by a small angle
          this.angle += 0.03 * flip;
        }

        // If the controls are right,
        if (this.controls.right) {

          // Rotate the car right by a small angle
          this.angle -= 0.03 * flip;
        }
    }

    // Update the x and y coordinates of the car
    // The car will move in the direction of the angle
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }



  // This method draws a car as a basic rectangle
  // It takes a canvas as an argument
  draw(ctx) {
    
    // If the car is damaged,
    if (this.damaged) {

      // Make it gray
      ctx.fillStyle = "gray";

    // If the car is not damaged,
    } else {

      // Make it black
      ctx.fillStyle = "black";
    }

    // Start a new path
    ctx.beginPath();

    // Move to the first point in the car polygon
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

    // Loop through the 3 remaining points of the car
    for (let i = 1; i < this.polygon.length; i++) {

      // Draw a line to the ith polygon
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }

    // Fill the car polygon
    ctx.fill();

    // Draw the sensor
    this.sensor.draw(ctx);
  }
}