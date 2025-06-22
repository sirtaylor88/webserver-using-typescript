import express from "express";
import { handlerReadiness } from "./handlers.js";

const app = express();
const PORT = 8080;

app.use("/app", express.static("./src/app"));
app.use("/app", express.static("./src/app/assets"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/healthz", handlerReadiness);
