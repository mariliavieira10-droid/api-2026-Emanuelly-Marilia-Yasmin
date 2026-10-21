import express from "express";
import expressLayouts from "express-ejs-layouts";
import homeRoutes from "./routes/homeRoutes.js";
import logger from "./middlewares/logger.js";

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.static("public"));
app.use(express.json());
app.use(logger);

app.use("/", homeRoutes);

app.listen(3000, () => console.log("http://localhost:3000"));