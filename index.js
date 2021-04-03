import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Card from "./models/tinderCards.js";

// App config
const app = express();
const port = process.env.PORT || 8001;

const connectionURL =
  "mongodb+srv://Jdan1:jdan1React@cluster0.amjez.mongodb.net/tinderDB?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(cors());

// Db config
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Api Endpoints

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/cards", async (req, res) => {
  const card = req.body;
  try {
    const response = await Card.create(card);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/cards", async (req, res) => {
  try {
    const tinderCards = await Card.find();
    res.status(200).send(tinderCards);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Listener
app.listen(port, () => console.log(`Listening on localhost ${port}`));
