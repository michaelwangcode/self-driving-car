// The Controls class for the Car class
class Controls {

  // The constructor for creating a Controls object
  constructor(type) {

    // The Controls object has four direction attributes (initially set to false)
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    // Set controls based on the type of car (driveable vs traffic)
    switch(type) {

      // If the car is driveable,
      case "KEYS":

        // Add a keyboard listener, which checks when a key is pressed
        this.#addKeyboardListeners();
        break;
      
      // If the car is a traffic (dummy) car,
      case "DUMMY":

        // Keep moving the car forward
        this.forward = true;
        break;
    }
  }

  
  // The addKeyboardListeners method 
  // The '#' means the method is a private method
  #addKeyboardListeners() {

    // Perform actions when a key is pressed
    document.onkeydown = (event) => {

      // When an arrow key is pressed, set a direction attribute to true
      switch(event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
      }
    }


    // Perform actions when a key is released
    document.onkeyup = (event) => {

      // When an arrow key is released, set a direction attribute to false
      switch(event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
    }
  }
}