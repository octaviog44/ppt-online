import * as express from "express";
import { firestore, rtdb } from "./db";
import { v4 as uuidv4 } from "uuid";
import * as cors from "cors";



const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/prueba", (req, res) => {
    res.json(req.body);
})

app.listen(port, () => {
    console.log(`iniciado en http://localhost:${port}`);
})


