import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Ruta para sumar los arrays
app.post("/", (req, res) => {
  const { tableOneValues, tableTwoValues } = req.body;

  // Verificar que ambos arrays existan y tengan la misma longitud
  if (!tableOneValues || !tableTwoValues || tableOneValues.length !== tableTwoValues.length) {
    return res
      .status(400)
      .json({ error: "Los arrays deben tener la misma longitud y no deben ser nulos." });
  }

  // Sumar los elementos de los arrays
  const sum = tableOneValues.map((value, index) => {
    return parseInt(value, 10) + parseInt(tableTwoValues[index], 10);
  });

  res.status(200).json(sum); // Enviar el array de resultados como respuesta
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto: 3000");
});
