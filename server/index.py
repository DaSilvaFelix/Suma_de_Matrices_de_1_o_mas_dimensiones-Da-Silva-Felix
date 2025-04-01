from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Habilitar CORS para solicitudes cruzadas
logging.basicConfig(level=logging.DEBUG)

@app.route("/", methods=["POST"])
def handle_request():
    try:
        # Verificar si los datos están presentes
        data = request.get_json()
        if not data:
            logging.warning("No se recibieron datos en la solicitud")
            return jsonify({"error": "No se enviaron datos"}), 400
        
        # Obtener los valores de los arrays
        table_one_values = data.get("tableOneValues", [])
        table_two_values = data.get("tableTwoValues", [])

        # Validar que sean listas y que tengan la misma longitud
        if not isinstance(table_one_values, list) or not isinstance(table_two_values, list):
            logging.error("Los datos enviados no son listas")
            return jsonify({"error": "Los valores enviados deben ser listas"}), 400

        if len(table_one_values) != len(table_two_values):
            logging.error("Las listas tienen longitudes diferentes")
            return jsonify({"error": "Las listas deben tener la misma longitud"}), 400

        # Validar que todos los elementos de las listas sean números
        try:
            table_one_values = [int(value) for value in table_one_values]
            table_two_values = [int(value) for value in table_two_values]
        except ValueError:
            logging.error("Al menos uno de los valores no es numérico")
            return jsonify({"error": "Todos los valores de las listas deben ser números"}), 400

        # Realizar la suma de los elementos
        sum_result = [
            table_one_values[i] + table_two_values[i]
            for i in range(len(table_one_values))
        ]

        logging.info(f"Suma realizada correctamente: {sum_result}")
        return jsonify(sum_result), 200

    except Exception as e:
        logging.error(f"Error al procesar la solicitud: {e}")
        return jsonify({"error": "Ocurrió un problema en el servidor"}), 500

if __name__ == "__main__":
    app.run(port=3000, debug=True)
