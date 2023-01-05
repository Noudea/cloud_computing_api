const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    name: String,
    prix: Number,
    stock: Number,
  },
  { timestamps: true }
);

const Produit = mongoose.model("Produit", produitSchema);

module.exports = { Produit };
