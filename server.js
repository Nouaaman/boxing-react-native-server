import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import fighters from "./routes/fighter.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/fighter", fighters);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
