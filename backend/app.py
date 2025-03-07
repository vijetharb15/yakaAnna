from flask import Flask, jsonify
from flask_cors import CORS
import sensors

app = Flask(__name__)
CORS(app)  # Allow frontend requests

@app.route('/sensor-data', methods=['GET'])
def get_sensor_data():
    """Fetch sensor readings."""
    data = sensors.read_sensors()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)  # Changed to debug=FalseSmart Washroom