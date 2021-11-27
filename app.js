var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var database = require("./config/database");
const cors = require("cors");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth.router");
var usuariosRouter = require("./routes/usuarios.router");
var empleadosRouter = require("./routes/empleados.router");
var bicicletasRouter = require("./routes/bicicletas.router");
var repuestosRouter = require("./routes/repuestos.router");
var accesoriosRouter = require("./routes/accesorios.router");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// DB mongo connection
database.mongoConnect();

// Router

app.use("/", indexRouter);
app.use("/api/empleados", empleadosRouter);
app.use("/api/bicicletas", bicicletasRouter);

app.use("/auth", authRouter);


app.use("/api/repuestos", repuestosRouter);
app.use("/api/accesorios", accesoriosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "The endpoint does not exist"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    errorcode: err.status || 500,
    message: res.locals.message,
  });
});

module.exports = app;
