const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const authRouter = require("./routes/auth.route");
const projectRouter = require("./routes/project.route");
const taskRouter = require("./routes/task.route");
const connectDb = require("./utils/db");
const cors = require("cors");
const app = express();

const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, HEAD, DELETE, PATCH",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
});
