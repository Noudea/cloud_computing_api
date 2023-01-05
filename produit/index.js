const port = process.env.PORT || 8080;

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://cloud:TOXPnmbaifRtU1lD@cluster0.9az5r4u.mongodb.net/produit"
);

const express = require("express");
const { Produit } = require("./Produit");

const app = express();
app.use(express.json());

app.post("/produit", async (req, res) => {
  console.log(req);
  const produit = new Produit({
    name: req.body.name,
    prix: req.body.prix,
    stock: req.body.stock,
  });
  try {
    const newproduit = await produit.save();
    res.status(201).json(newproduit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  const app = express();

  app.post("/produit", (req, res) => {
    res.status(201).json(produit);
  });
});

app.get("/produit/:id", (req, res) => {
  console.log(req);
  //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
  Produit.findById(req.params.id, function (err, produit) {
    if (err) res.send(err);
    res.json(produit);
  });
});

app.patch("/produit/:id", (req, res) => {
  Produit.findById(req.params.id, (error, produit) => {
    if (error) {
      res.send(error);
    } else {
      produit.name = req.body.name;
      produit.price = req.body.price;
      produit.stock = req.body.stock;

      produit.save((error) => {
        if (error) {
          res.send(error);
        } else {
          res.json({ message: "Produit updated successfully" });
        }
      });
    }
  });
});

app.delete("/produit/:id", (req, res) => {
  Produit.findById(req.params.id, (error, produit) => {
    if (error) {
      res.send(error);
    } else {
      produit.name = req.body.name;
      produit.price = req.body.price;
      produit.stock = req.body.stock;

      produit.delete((error) => {
        if (error) {
          res.send(error);
        } else {
          res.json({ message: "Produit deleted successfully" });
        }
      });
    }
  });
});

app.listen(8080, () => {
  console.log("hello");
});
