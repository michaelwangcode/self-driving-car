// Store the car canvas from index.html and set its width
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

// Store the network canvas from index.html and set its width
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

// Create a context to draw on the canvas
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

// Create a Road object (defined in road.js)
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

// Create a Car object (declared in car.js)
// Use the getLaneCenter function to start the car in the center of a lane
// To make the car controllable with the keyboard, use "KEYS"
// To make the car move by itself, use "AI"
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");

// Create traffic that will be added to the road
// Traffic is an array of car objects
const traffic = [

  // Create a car object and pass it the "DUMMY" argument
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
];

// Call the animate function to animate the car when it moves
animate();



// The animate function animates the car when it moves
function animate(time) {

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

  // Set the height of the car canvas, which redraws the car without a trail
  carCanvas.height = window.innerHeight;

  // Set the height of the network canvas
  networkCanvas.height = window.innerHeight;

  // Save the drawing state
  carCtx.save();

  // Translate the drawing state: 
  // This makes the car centered in the screen while it moves down the road
  // The 0.7 means the car sits 70% from the top of the screen
  carCtx.translate(0, -car.y + carCanvas.height * 0.7);

  // Call the road's draw method
  road.draw(carCtx);

  // Loop through all of the cars in the traffic array
  for(let i = 0; i < traffic.length; i++) {

    // Draw the traffic car
    traffic[i].draw(carCtx, "red");
  }

  // Call the car's draw method
  car.draw(carCtx, "blue");

  // Restore the drawing state
  carCtx.restore();

  // Animate the neural network lines
  networkCtx.lineDashOffset=-time/50;

  // Call the drawNetwork function in the Visualizer class to draw the network
  Visualizer.drawNetwork(networkCtx, car.brain);

  // Use requestAnimationFrame to call the animate method many times per second
  // This gives the illusion of movement
  requestAnimationFrame(animate);
}