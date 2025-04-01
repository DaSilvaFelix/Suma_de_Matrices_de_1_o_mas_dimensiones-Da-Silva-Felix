const rowInput = document.getElementById("rowInput");
const colInput = document.getElementById("colInput");
const tableOne = document.getElementById("matris1");
const tableTwo = document.getElementById("matris2");
const tableThree = document.getElementById("matris3");
const buttonOperations = document.getElementById("opertions");

// Evento para generar tablas dinámicas
[rowInput, colInput].forEach((input) =>
  input.addEventListener("change", () => {
    const rows = parseInt(rowInput.value, 10);
    const cols = parseInt(colInput.value, 10);

    if (!isNaN(rows) && rows > 0 && !isNaN(cols) && cols > 0) {
      // Limpiar las tablas antes de actualizarlas
      tableOne.innerHTML = "";
      tableTwo.innerHTML = "";
      tableThree.innerHTML = "";

      for (let i = 1; i <= rows; i++) {
        const row1 = document.createElement("tr");
        const row2 = document.createElement("tr");
        const row3 = document.createElement("tr");

        for (let j = 1; j <= cols; j++) {
          const cell1 = document.createElement("td");
          const cell2 = document.createElement("td");
          const cell3 = document.createElement("td");

          // Inputs en las tablas
          cell1.innerHTML = `<input type="number" class="number-input" placeholder="0" required>`;
          cell2.innerHTML = `<input type="number" class="number-input" placeholder="0" required>`;
          cell3.innerHTML = `<input type="text" class="number-input" readonly >`;

          row1.appendChild(cell1);
          row2.appendChild(cell2);
          row3.appendChild(cell3);
        }

        tableOne.appendChild(row1);
        tableTwo.appendChild(row2);
        tableThree.appendChild(row3);
      }
    }
  })
);

// Función para obtener los valores de los inputs dentro de las tablas
function getInputValues(table) {
  const inputs = table.querySelectorAll("input[type='number']"); // Solo inputs numéricos
  const values = [];
  inputs.forEach((input) => {
    values.push(parseInt(input.value, 10) || 0); // Garantizar valores numéricos
  });
  return values;
}

// Evento en el botón para enviar los valores al servidor
buttonOperations.addEventListener("click", async () => {
  // Obtener los valores de las tablas
  const tableOneValues = getInputValues(tableOne);
  const tableTwoValues = getInputValues(tableTwo);

  console.log("Valores de matris1:", tableOneValues);
  console.log("Valores de matris2:", tableTwoValues);

  // Enviar los valores al servidor
  try {
    const req = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableOneValues,
        tableTwoValues,
      }),
    });

    const res = await req.json();
    console.log("Resultado del servidor:", res);

    // Mostrar los resultados en tableThree
    const rows = tableThree.querySelectorAll("tr");
    let index = 0;

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      cells.forEach((cell) => {
        if (index < res.length) {
          cell.querySelector("input").value = res[index]; // Actualizar los valores de resultados
          index++;
        }
      });
    });
  } catch (error) {
    console.error("Error al enviar datos al servidor:", error);
  }
});
