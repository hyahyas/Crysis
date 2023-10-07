const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(require("./src/routes/user.routes"));
app.use(require("./src/routes/announcement.routes"))
app.use(require("./src/routes/server.routes"))
app.use(require("./src/routes/tickets.routes"))
app.use(require("./src/routes/restraunts.routes"))
require("./src/db/conn");
 
app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`);
});