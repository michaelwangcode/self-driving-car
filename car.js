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

    // Initialize a Controls object
    this.controls = new Controls();
  }



  // The update method performs actions based on the controls object
  update() {

    // Call the move method to move the car
    this.#move()
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
    
    // Save the default state of the canvas
    ctx.save();

    // Add a translation transformation
    ctx.translate(this.x, this.y);

    // Rotate the car by a specified angle
    ctx.rotate(-this.angle);
    

    // Start a new path
    ctx.beginPath();
    
    // Draw the car as a rectangle
    // The x and y values are in the center of the car
    ctx.rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    // Fill the canvas
    ctx.fill();

    
    // Restore the canvas
    ctx.restore(); 
  }
}