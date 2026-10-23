
import express from "express";
import expressLayouts from "express-ejs-layouts";
import homeRoutes from "./routes/homeRoutes.js";
import livroRoutes from "./routes/livroRoutes.js";
import paginasRoutes from "./routes/paginasRoutes.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.static("public"));
app.use(express.json());
app.use(logger);

app.use("/", homeRoutes);
app.use("/", livroRoutes);
app.get("/teste", (req, res) => {
  res.send("TESTE FUNCIONANDO!");
});
app.use("/", paginasRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => console.log("http://localhost:3000"));