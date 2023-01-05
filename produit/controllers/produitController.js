const Produit = require("../models/Produit");

const axios = require('axios');



exports.index = (req, res) => {
  res.send("Hello from Products API");
}

/**
 * GET Single POST
 * @param id
 */
exports.produit_get_post = (req, res) => {
    Produit.findById(req.params.id, (err, produit) => {
        if (err) es.send({"error": "No procuct found", "message": err.message})
        res.send(produit);
    });
}

/**
 * GET ALL POSTS
 */
exports.produit_get_all_post = (req, res) => {
    Produit.find({}, (err, produits) => {
        if(!err){
          res.status(200);
          res.send(produits);
        }
        else{
          res.status(400);
          res.send({"error": "No procuct found", "message": err.message})
        }
      });
}


/**
 * CREATE Single POST
 */
exports.produit_create_post = (req, res) => {
    Produit.create({
        name: req.body.name,
        prix: req.body.prix,
        stock: req.body.stock,
    }, (err, produit) => {
      if(!err){
        res.status(201);
        res.send(produit);
      }
      else{
        res.status(400);
        res.send({"error": "Failed to create a new product", "message": err.message})
      }
    })
}



/**
 * UPDATE Single POST
 * @param id
 */
exports.produit_update_post = (req, res) => {
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
}

/**
 * DELETE Single POST
 * @param id
 */
exports.produit_delete_post = (req, res) => {
    Produit.findByIdAndDelete(req.params.id, (err, produit) => {
        if(!err){
            res.status(200);
            res.send({"message": "Successfully removed", "produit": produit});
        }
        else{
            res.status(400);
            res.send({"error": "Failed to delete", "message": err.message})
        }
    })
}