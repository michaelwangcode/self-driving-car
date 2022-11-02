# Self Driving Car

## About

This Javascript project uses a neural network to simulate a self driving car without any external libraries. 

The tutorial for this project can be located [here](https://www.youtube.com/watch?v=Rs_rAxEsAvI).

!["Screenshot"](https://raw.githubusercontent.com/michaelwangcode/self-driving-car/master/screenshot.png)



## Part 1: Car Driving Mechanics

In Part 1 of the project, the car and controls are defined. 

Using the arrow keys, a user is able to move the car forwards and backwards as well as steer the car left and right.

Speed, acceleration, max speed, friction and angle are properties of the Car class.

The Controls class listens for when the arrow keys are pressed and released.



## Part 2: Defining The Road

In Part 2 of the project, the road is defined.

The road consists of a border, lanes and dotted center lines.

The Road class contains a number of properties used to draw the coordinates and dimensions of the road.

Lastly, the animate function in the main class is updated so the car is centered on the screen as it drives.



## Part 3: Artificial Sensors

In Part 3 of the project, the sensors for the car are defined.

The sensors are a set of straight lines, called rays, that shoot out from the front of the car.

The ray count, length and angles are adjustable.

When a ray intersects with the border of the road, it changes colour to indicate there is contact.



## Part 4: Collision Detection

In Part 4 of the project, we add collision detection for the car.

A collision occurs when any point of the car touches the road border.

In order to detect collisions, the car is redrawn as a 4-sided polygon.

A function is used to constantly calculate if any line of the car intersects with the road border.

When the car is damaged, it turns grey and is unable to move.



## Part 5: Simulating Traffic

In Part 5 of the project, we simulate traffic by adding an additional car to the road.

The traffic automatically drives forward at a slower speed than our car.

The sensors for our car are updated to detect traffic.

If our car collides with traffic, it becomes damaged and is unable to move.

Our car is now blue and traffic is made red to improve visibility.



## Part 6: Neural Network

In Part 6 of the project, we add a neural network for the car.

Neurons on the 1st layer (input layer) will be connected to the car sensors.

Neurons on the 2nd layer (hidden layer) transform the inputs to produce outputs.

Neurons on the 3rd layer (output layer) will be connected to the car controls.

Weights represent the connection between two neurons and are randomly generated.

The output is an array of four numbers that tell the car to go forwards, backwards, left and right.

When the car's sensors touch traffic, the car will slow down to avoid a collision.

Lastly, a visualizer is added to display the neural network beside the road.



## Part 7: Parallelization

In Part 7 of the project, we will run many car simulations in parallel.

We track the "best" car, which is the car with the smallest y-value that has moved the furthest up the road.

All other cars have their sensors removed and transparency increased.

A save button is added to save the car in local storage.

Lastly, two additional cars are added on the road as traffic.



## Part 8: Genetic Algorithm

In the final part of the project, we will add a mutate function for the car.

A decimal value from 0 to 1 determines how different a mutated car behaves from the original.

A value of 1 means the mutated car is completely different while a value of 0.1 means the mutated car is very similar.

When we save a car in local storage and refresh the program, the saved car will mutate.

This will increase the chances that there will be a car that makes it through all of the traffic.

To increase the chances of finding a successful car, we can increase the number of simulated cars from 100 to 1000.



## Running The Program

Open the index.html file in a Google Chrome window.

To run the program efficiently, set the number of cars to 1000 and set the mutation amount to around 0.2 (in main.js).

Every time a simulated car makes it past a traffic car without crashing, click the save icon to save the car's progress.

When you refresh and rerun the program, new cars will mutate from the last saved location.

Repeat the process when a mutated car makes it past the next set of traffic.

It will usually take multiple attempts to get a successful car.

To reset the simulation, click the discard button and refresh the program.
