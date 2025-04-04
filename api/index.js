const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const SECRET_KEY = process.env.SECRET_KEY;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FlowUp",
      version: "1.0.0",
      description:
        "",
    }
  },

  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middleware de protection des routes
const authenticate = (req, res, next) => {
    if(req.path === "/login" || req.path === "/register") return next();
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token
    if (!token) return res.status(401).json({ error: "Accès non autorisé" });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; // Ajouter les infos du user à la requête
      next();
    } catch (error) {
      res.status(403).json({ error: "Token invalide" });
    }
}

// app.use(authenticate);

// Endpoints 

const categoryRoutes = require('./routes/categoryRoutes');
app.use("/", categoryRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/", productRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const bestSellsRoutes = require("./routes/bestSellsRoutes");
app.use("/", bestSellsRoutes);

const newsRoutes = require("./routes/newsRoutes");
app.use("/", newsRoutes);

const requestRoutes = require("./routes/requestRoutes");
app.use("/", requestRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/", orderRoutes);

const brandRoutes = require("./routes/brandRoutes");
app.use("/", brandRoutes);

const performanceRoutes = require("./routes/performanceRoutes");
app.use("/", performanceRoutes);

const photoRoutes = require("./routes/photoRoutes");
app.use("/", photoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});