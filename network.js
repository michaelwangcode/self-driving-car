// The Neural Network class
// A Neural Network is made up of Levels
class NeuralNetwork {

  // The constructor for the NeuralNetwork class
  // It has a neuron count as a parameter, which is an array of layers and how many neurons are in each layer
  // Example: [5, 6, 4]
  constructor(neuronCounts) {

    // Create an array of levels
    this.levels = [];

    // Iterate through the neuron count
    for (let i = 0; i < neuronCounts.length - 1; i++) {

      // Add a new Level to the levels array
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }


  // The feedForward algorithm computes the output values
  // It takes givenInputs and a network as inputs
  static feedForward(givenInputs, network) {

    // Get the output array for the level by calling the feedForward function from the Levels class
    let outputs = Level.feedForward(givenInputs, network.levels[0]);

    // Iterate through the remaining levels
    for (let i = 1; i < network.levels.length; i++) {

      // Update the outputs with the feedForward result from the level i
      outputs = Level.feedForward(outputs, network.levels[i]);
    }

    // Return the outputs array
    return outputs;
  }



  // The mutate function mutates a network by a given amount
  // An amount of 1 means 100% (completely random)
  // An amount of 0.1 or 10% gives you a slight mutation (close to original)
  static mutate(network, amount = 1) {

    // Iterate through all of the levels of the network
    network.levels.forEach(level => {

      // Iterate through all of the biases
      for (let i = 0; i < level.biases.length; i++) {

        // Set the ith bias using the linear interpolation function
        level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
      }

      // Iterate through all of the weights (output neurons)
      for(let i = 0; i < level.weights.length; i++){
        
        // Iterate through all of the weights (input neurons)
        for(let j = 0; j < level.weights[i].length; j++){

          // Set the weight at i,j using the linear interpolation function
          level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1,amount);
        }
      }
    });
  }
}



// The Level class represents layers in the neural network
// It has a layer of input neurons and a layer of output neurons
class Level {

  // The constructor for the Level class
  constructor(inputCount, outputCount) {

    // Define the neurons using arrays of values:

    // The input array for the level
    this.inputs = new Array(inputCount);

    // The output array for the level
    this.outputs = new Array(outputCount);

    // The bias array for the level
    // Each output neuron has a bias: A value for which it will fire
    this.biases = new Array(outputCount);


    // The weights array represents the connections between two neurons
    // It will be a 2D array
    this.weights = [];

    // Iterate through all of the input nodes/neurons
    for (let i = 0; i < inputCount; i++) {

      // EACH input neuron will have a connection to ALL of the output neurons
      this.weights[i] = new Array(outputCount);
    }

    // Call the randomize function to set the weights to a random value
    Level.#randomize(this);
  }


  // The randomize method assigns random values to weights in a Level
  // It takes a Level object as input
  // The 'static' keyword means this function is part of a class and not an instance of an object
  static #randomize(level) {

    // Iterate through the inputs array length
    for (let i = 0; i < level.inputs.length; i++) {

      // Iterate through the output array length
      for (let j = 0; j < level.outputs.length; j++) {

        // Set the weight to a random value between -1 and 1
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    // Iterate through the biases array
    for (let i = 0; i < level.biases.length; i++) {

      // Set the bias to a random value between -1 and 1
      level.biases[i] = Math.random() * 2 - 1;
    }
  }


  // The feedForward algorithm computes the output values
  // It takes givenInputs and a Level object as inputs
  // givenInputs are values that come from the sensor
  static feedForward(givenInputs, level) {

    // Iterate through all of the level inputs
    for (let i = 0; i < level.inputs.length; i++) {

      // Set the level object's inputs to the values that come from the sensor
      level.inputs[i] = givenInputs[i];
    }

    // Calculating values for the output neurons/nodes:
    // Iterate through all of the outputs
    for (let i = 0; i < level.outputs.length; i++) {

      // Keep track of the sum of the value of the inputs multiplied by the weight
      let sum = 0;

      // Iterate through the input neurons
      for (let j = 0; j < level.inputs.length; j++) {

        // The sum will add the product between the input and the weight
        sum += level.inputs[j] * level.weights[j][i];
      }

      // If the sum if greater than the output neuron value,
      if (sum > level.biases[i]) {

        // Set the output neuron to 1
        level.outputs[i] = 1;

      // Otherwise,
      } else {

        // Set the output neuron to 0
        level.outputs[i] = 0;
      }
    }

    // Return the level outputs
    return level.outputs;
  }
}