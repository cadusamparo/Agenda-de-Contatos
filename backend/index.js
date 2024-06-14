import express from "express";
import index from "./routes/index.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", index);

app.listen(8800);
