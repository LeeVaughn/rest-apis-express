const express = require('express');
const app = express();
const routes = require("./routes");

app.use(express.json());
// uses routes in routes when path starts with /api
app.use("/api", routes);

// middleware to create error
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// global error handler
app.use ((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { message: err.message }});
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
