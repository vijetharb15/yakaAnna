import axios from "axios";

const API_URL = "http://localhost:5000/sensor-data"; // Replace with Pi IP

export const fetchSensorData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    
    return { odorLevel: 0, soapLevel: 0, motionDetected: false };
  }
};
