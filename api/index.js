const express = require('express');
const cors = require('cors');
const User = require("./models/user");
require('dotenv').config();
const bcrypt = require("bcrypt");
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

// Endpoints 

const categoryRoutes = require('./routes/categoryRoutes');
app.use("/category", categoryRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);


//ROUTE : Inscription
app.post('/register', async(req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const user = await User.createUser({ firstname, lastname, email, password });
        res.status(201).json({ message: "Utilisateur crée", user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//ROUTE : Connexion
app.get('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.getUserByEmail({ email });

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({ error: "Identifiants invalides" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: "2h",
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});