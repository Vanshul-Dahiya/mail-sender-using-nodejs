const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const appRoute = require("./routes/route.js");
const PORT = 5000;
const app = express();

app.use(express.json());

// routes
app.use("/api", appRoute);

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
