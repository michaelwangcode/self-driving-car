//----- CREATE CANVAS -----//

// Store the car canvas from index.html and set its width
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

// Store the network canvas from index.html and set its width
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

// Create a context to draw on the canvas
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");



//----- CREATE ROAD -----//

// Create a Road object (defined in road.js)
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);



//----- CREATE CARS -----//

// Generate 100 AI Car objects
const N = 100;
const cars = generateCars(N);

// Set the best car
// This will eventually be set to the car with the smallest y value
let bestCar = cars[0];

// If there is a best brain stored in local storage,
if (localStorage.getItem("bestBrain")) {

  // Set the brain of the best car to the best brain
  bestCar.brain = JSON.parse(localStorage.getItem("bestBrain"));
}



//----- CREATE TRAFFIC -----//

// Create traffic that will be added to the road
// Traffic is an array of car objects
const traffic = [

  // Create a traffic car object in lane 1
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),

  // Create a traffic car object in lane 0
  new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),

  // Create a traffic car object in lane 2
  new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2)
];



//----- ANIMATE THE CARS -----//

// Call the animate function to animate all of the cars
animate();



//----- LOCAL STORAGE FUNCTIONS -----//

// This function saves the best car's brain in local storage
function save() {

  // Store the best car's brain (neural network) in local storage
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}



// This function removes the best car's brain from local storage
function discard() {

  // Remove the best car;s brain from local storage
  localStorage.removeItem("bestBrain");
}



//----- GENERATE CARS FUNCTION -----//

// This function generates N number of AI cars for the simulation
function generateCars(N) {

  // Store the array of cars
  const cars = [];

  // Loop through from 1 to N
  for (let i = 1; i < N; i++) {

    // Add an AI car to the cars array
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
  }

  // Return the cars array
  return cars;
}



//----- ANIMATE FUNCTION -----//

// The animate function animates the car when it moves
function animate(time) {

  // Adding Traffic
  // Loop through the cars in the traffic array and add them to the road
  for (let i = 0; i < traffic.length; i++) {

    // Update the traffic car's coordinates
    // Pass the road borders as an argument
    traffic[i].update(road.borders, []);
  }

  // Adding AI Cars
  // Loop through the cars
  for (let i = 0; i < cars.length; i++ ) {

    // Pass the road borders and traffic as arguments
    cars[i].update(road.borders, traffic);
  }

  // Find the 'best' car to follow
  // The best car is the one with the smallest y value (driving furthest up the road)
  // Create a new array with the y values of the cars
  // Store the car with the smallest y value
  bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)));


  // Set the height of the car canvas, which redraws the car without a trail
  carCanvas.height = window.innerHeight;

  // Set the height of the network canvas
  networkCanvas.height = window.innerHeight;

  // Save the drawing state
  carCtx.save();

  // Translate the drawing state: 
  // This makes the car centered in the screen while it moves down the road
  // The 0.7 means the car sits 70% from the top of the screen
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

  // Call the road's draw method
  road.draw(carCtx);

  // Loop through all of the cars in the traffic array
  for (let i = 0; i < traffic.length; i++) {

    // Draw the traffic car in red
    traffic[i].draw(carCtx, "red");
  }

  // Change the transparency of the cars to be more transparent
  carCtx.globalAlpha = 0.2;

  // Loop through all of the AI cars in the cars array
  for (let i = 0; i < cars.length; i++) {

    // Draw the AI car in blue
    cars[i].draw(carCtx, "blue");
  }

  // Change the transparency of the cars back to default
  carCtx.globalAlpha = 1;

  // Draw the best car with the maximum opacity
  // It will be the only car we draw sensors for
  bestCar.draw(carCtx, "blue", true);


  // Restore the drawing state
  carCtx.restore();

  // Animate the neural network lines
  networkCtx.lineDashOffset= -time/50;

  // Call the drawNetwork function in the Visualizer class to draw the network
  Visualizer.drawNetwork(networkCtx, bestCar.brain);

  // Use requestAnimationFrame to call the animate method many times per second
  // This gives the illusion of movement
  requestAnimationFrame(animate);
}
