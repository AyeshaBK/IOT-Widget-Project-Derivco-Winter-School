// Generate a new random MQTT client id on each page load
var MQTT_CLIENT_ID = "iot_web_"+Math.floor((1 + Math.random()) * 0x10000000000).toString(16);

// Create a MQTT client instance
var MQTT_CLIENT = new Paho.MQTT.Client("iot.eclipse.org", 80, "/ws", MQTT_CLIENT_ID);

// Tell the client instance to connect to the MQTT broker
MQTT_CLIENT.connect({ onSuccess: myClientConnected });

// This is the function which handles button clicks
function myButtonWasClicked() {
  // create a new MQTT message with a specific payload
  var mqttMessage = new Paho.MQTT.Message("Hello from website");

  // Set the topic it should be published to
  mqttMessage.destinationName = "BibiKhan/iot_tutorial/from_webpage";

  // Publish the message
  MQTT_CLIENT.send(mqttMessage);
}

// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
  MQTT_CLIENT.subscribe("BibiKhan/iot_tutorial/from_esp8266");
}

// This is the function which handles received messages
function myMessageArrived(message) {
  // Get the payload
  var messageBody = message.payloadString;

  // Create a new HTML element wrapping the message payload
  var messageHTML = $("<p>"+messageBody+"</p>");

  // Insert it inside the ```id=updateMe``` element above everything else that is there 
  $("#updateMe").prepend(messageHTML);
    
    // Check for "button pushed" messages
  if(messageBody == "button pushed") {
    // Show an alert if one is received
    alert("The button was pushed!");
  }
  // Check for "light sensor" messages
  if(messageBody.startsWith("light sensor")) {
    // Update the id=lightSensorValue placeholder
    $("#lightSensorValue").text("latest "+messageBody);
  }
};

// Tell MQTT_CLIENT to call myMessageArrived(message) each time a new message arrives
MQTT_CLIENT.onMessageArrived = myMessageArrived;

// This function handles "Turn LED on" button clicks
function turnOnLED() {
  // create a new MQTT message with a specific payload
  var mqttMessage = new Paho.MQTT.Message("turn led on");

  // Set the topic it should be published to
  mqttMessage.destinationName = "BibiKhan/iot_tutorial/from_webpage";

  // Publish the message
  MQTT_CLIENT.send(mqttMessage);
}

// This function handles "Turn LED on" button clicks
function turnOffLED() {
  // create a new MQTT message with a specific payload
  var mqttMessage = new Paho.MQTT.Message("turn led off");

  // Set the topic it should be published to
  mqttMessage.destinationName = "BibiKhan/iot_tutorial/from_webpage";

  // Publish the message
  MQTT_CLIENT.send(mqttMessage);
}