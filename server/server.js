import express from "express";
import dotenv from "dotenv";

// load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// trust proxy
app.set("trust proxy", true);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({
    message: "ok",
    ip: req.ip
  });
});

// start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});