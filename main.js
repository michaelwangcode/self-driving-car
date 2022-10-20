// Store the canvas from index.html and set its width
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// Create a context to draw on the canvas
const ctx = canvas.getContext("2d");

// Create a Road object (defined in road.js)
const road = new Road(canvas.width / 2, canvas.width * 0.9);

// Create a Car object (declared in car.js)
// Use the getLaneCenter function to start the car in the center of a lane
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

// Call the animate function to animate the car when it moves
animate();



// The animate function animates the car when it moves
function animate() {

  // Update the car's coordinates
  // Pass the road borders as an argument
  car.update(road.borders);

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

  // Call the car's draw method
  car.draw(ctx);

  // Restore the drawing state
  ctx.restore();

  // Use requestAnimationFrame to call the animate method many times per second
  // This gives the illusion of movement
  requestAnimationFrame(animate);
}