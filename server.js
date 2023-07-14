const express = require("express");
const cors = require ("cors");
const dbj = require("./db/conn");

const records = require("./routes/record");

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use(records);

// start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });
console.log("Okay");
dbj.connectToDb().then((res)=>{
  app.listen(PORT, () => {
    console.log(`Connected to port: ${PORT}`);
  });
});

  // app.listen(PORT, () => {
  //   console.log(`Connected to port: ${PORT}`);
  // });
