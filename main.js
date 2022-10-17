// Store the canvas from index.html and set its width
const canvas = document.getElementById("myCanvas");
canvas.width = 400;

// Create a context to draw on the canvas
const ctx = canvas.getContext("2d");

// Create a car object (declared in Car.js)
const car = new Car(100, 100, 30, 50);

// Draw the car on the canvas
car.draw(ctx);

// Call the animate function to animate the car when it moves
animate();



// The animate function animates the car when it moves
function animate() {

  // Update the car's coordinates
  car.update();

  // Set the height of the canvas, which redraws the car without a trail
  canvas.height = window.innerHeight;

  // Call the car's draw method
  car.draw(ctx);

  // Use requestAnimationFrame to call the animate method many times per second
  // This gives the illusion of movement
  requestAnimationFrame(animate);
}