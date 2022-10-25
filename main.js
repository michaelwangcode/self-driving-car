// Store the canvas from index.html and set its width
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// Create a context to draw on the canvas
const ctx = canvas.getContext("2d");

// Create a Road object (defined in road.js)
const road = new Road(canvas.width / 2, canvas.width * 0.9);

// Create a Car object (declared in car.js)
// Use the getLaneCenter function to start the car in the center of a lane
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");

// Create traffic that will be added to the road
// Traffic is an array of car objects
const traffic = [

  // Create a car object and pass it the "DUMMY" argument
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
];

// Call the animate function to animate the car when it moves
animate();



// The animate function animates the car when it moves
function animate() {

  // Adding traffic
  // Loop through the cars in the traffic array and add them to the road
  for (let i = 0; i < traffic.length; i++) {

    // Update the traffic car's coordinates
    // Pass the road borders as an argument
    traffic[i].update(road.borders, []);
  }

  // Update the car's coordinates
  // Pass the road borders and traffic as arguments
  car.update(road.borders, traffic);

  // Set the height of the canvas, which redraws the car without a trail
  canvas.height = window.innerHeight;


  // Save the drawing state
  ctx.save();

  // Translate the drawing state: 
  // This makes the car centered in the screen while it moves down the road
  // The 0.7 means the car sits 70% from the top of the screen
  ctx.translate(0, -car.y + canvas.height * 0.7);

  // Call the road's draw method
  road.draw(ctx);

  // Loop through all of the cars in the traffic array
  for(let i = 0; i < traffic.length; i++) {

    // Draw the traffic car
    traffic[i].draw(ctx, "red");
  }

  // Call the car's draw method
  car.draw(ctx, "blue");

  // Restore the drawing state
  ctx.restore();

  // Use requestAnimationFrame to call the animate method many times per second
  // This gives the illusion of movement
  requestAnimationFrame(animate);
}