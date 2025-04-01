import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { tableOneValues, tableTwoValues } = req.body;

  const sum = [];

  for (let i = 0; i < tableOneValues.length; i++) {
    sum.push(parseInt(tableOneValues[i]) + parseInt(tableTwoValues[i]));
  }
  res.status(200).json(sum);
});

export default router;
