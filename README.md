# Self Driving Car

## About

This Javascript project uses a neural network to simulate a self driving car without any external libraries. 

The tutorial for this project can be located [here](https://www.youtube.com/watch?v=Rs_rAxEsAvI).



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

