// The Sensor class for the car
// A sensor is composed of rays that are emitted from the front of the car
class Sensor {

  // The Constructor for a Sensor object 
  // It takes a car as an argument
  constructor(car) {

    // Set the car property
    this.car = car;

    // Set the ray count, length and spread (angles)
    this.rayCount = 5;
    this.rayLength = 100;
    this.raySpread = Math.PI / 2;

    // Create an array to hold the rays
    this.rays = [];

    // Create an array to store ray reading values
    // Readings tell you how far the ray is from the road border
    // There is one reading for each ray
    this.readings = [];
  }



  // The update method for the sensor
  // Take the road borders and traffic as an argument 
  update(roadBorders, traffic) {

    // Call the castRays method to calculate the sensor rays
    this.#castRays();

    // Create an array to store the ray readings
    this.readings = [];

    // Use a for loop to add readings to the array
    for (let i = 0; i < this.rays.length; i++) {

      // Use the getReading method to add a reading value to the readings array
      this.readings.push(this.#getReading(this.rays[i], roadBorders, traffic));
    }
  }



  // This method calculates whether the ray touches any road border or traffic
  #getReading(ray, roadBorders, traffic) {

    // Create a touches array to store every time the ray touches the road
    let touches = [];

    // Iterate through all of the road borders
    for (let i = 0; i < roadBorders.length; i++) {

      // Use the getIntersection function to determine if the ray and road touch
      // The function is located in (utils.js)
      const touch = getIntersection(
        ray[0], 
        ray[1], 
        roadBorders[i][0],
        roadBorders[i][1]
      );

      // If there is a touch (if the touch is not null),
      if (touch) {

        // Add the touch to the touches array
        touches.push(touch);
      }
    }

    
    // Iterate through all of the traffic cars
    for (let i = 0; i < traffic.length; i++) {

      // Store the polygon for the traffic car
      const poly = traffic[i].polygon;

      // Iterate through all of the points in the traffic car polygon
      for (let j = 0; j < poly.length; j++) {

        // Use the getIntersection function to determine if the ray and traffic car touch
        // The function is located in (utils.js)
        const value = getIntersection(
          ray[0], 
          ray[1], 
          poly[j],
          poly[(j + 1) % poly.length]
        );

        // If there is a value,
        if (value) {

          // Add the value to the touches array
          touches.push(value);
        }
      }
    }
    

    // If the touches array has no touches,
    if (touches.length == 0) {

      // Return null
      return null;

    // If the touches array contains values,
    } else {

      // Create an offsets array to store the offset value
      // (Each touch object has an x, y and offset)
      // An offset is the distance between the ray/border intersection and the center of the car
      const offsets = touches.map(e => e.offset);

      // Get the smallest offset in the offsets array
      const minOffset = Math.min(...offsets);

      // Return the touch that has the minimum offset
      // (Return the ray/border intersection point that is the smallest distance to the car)
      return touches.find(e => e.offset == minOffset);
    }
  }



  // The castRays method calculates the coordinates for the sensor rays
  // The '#' means the method is a private method
  #castRays() {

    // Set the rays array to be empty
    this.rays = [];

    // Create the rays using a for loop
    for (let i = 0; i < this.rayCount; i++) {
      
      // Use the lerp function (in utils.js) to calculate ray angle
      // Add the car angle so the rays change direction when the car does
      // If the rayCount is 1, make the third value 0.5
      const rayAngle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
      ) + this.car.angle;

      // Start point of the ray: The car's x and y
      const start = {x: this.car.x, y: this.car.y};

      // End point of the ray: Determined by ray angle and length
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength
      };

      // Store the start and end point to form a line segment
      // Push the start and end points to the rays array (decared outside the for loop)
      this.rays.push([start, end]);
    }
  }

  

  // This method draws all of the sensor rays for the car
  // It takes a canvas as an argument
  draw(ctx) {

    // Iterate through all of the rays
    for (let i = 0; i < this.rayCount; i++) {

      // Store the endpoint for the ray
      let end = this.rays[i][1];

      // If there is a ray reading (intesection of ray and road border),
      if (this.readings[i]) {

        // Set the endpoint of the ray to that reading
        end = this.readings[i];
      }

      //----- Draw yellow portion of ray -----//

      // Set the width and color of the ray
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";

      // Start point of the ray
      ctx.moveTo(
        this.rays[i][0].x,
        this.rays[i][0].y
      );

      // End point of the ray
      ctx.lineTo(
        end.x,
        end.y
      );

      // Draw the ray
      ctx.stroke();

      //----- Draw black portion of ray -----//

      // Set the width and color of the ray
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";

      // Start point of the ray
      ctx.moveTo(
        this.rays[i][1].x,
        this.rays[i][1].y
      );

      // End point of the ray
      ctx.lineTo(
        end.x,
        end.y
      );

      // Draw the ray
      ctx.stroke();
    }
  }
}