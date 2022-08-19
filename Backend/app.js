const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const userRouter = require("./routes/usersRoutes");

// const corsOptions = {
//   credentials: true,
// };
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  // console.log(res);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/v1/users", userRouter);

module.exports = app;
