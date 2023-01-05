const Recette = require("../models/Recette")

const axios = require('axios')


exports.index = (req, res) => {
  res.send("Hello from Recipes API");
}

/**
 * GET Single POST
 * @param id
 */
exports.recette_get_post = (req, res) => {
    Recette.findById(req.params.id, (err, recette) => {
      const requests = []
      const urlList = []
      

      Recette.findById(req.params.id, async (err, recette) => {

        if(!err){

          recette.ingredients.forEach(el => {
            urlList.push(process.env.API_INGREDIENT+el)
          });

          const ingredients = await Promise.all( urlList.map( async (el) => {
            const res = await axios.get(el)
            return res.data
          })
          )

          recette.ingredients = ingredients
          res.status(200);
          res.send({recette});
        }
        else{
          res.status(400);
          res.send({"error": "No recipe found", "message": err.message})
        }
      })
    });
}


/**
 * GET ALL POSTS
 */
exports.recette_get_all_post = (req, res) => {
    Recette.find({}, (err, recettes) => {
        if(!err){
          res.status(200);
          res.send(recettes);
        }
        else{
          res.status(400);
          res.send({"error": "No recipe found", "message": err.message})
        }
      });
}

/**
 * CREATE Single POST
 */
exports.recette_create_post = (req, res) => {
  Recette.create({
    name: req.body.name,
    temps: req.body.temps,
    howto: req.body.howto,
    ingredients: req.body.ingredients,
  }, (err, recette) => {
    if(!err){
      res.status(201);
      res.send(recette);
    }
    else{
      res.status(400);
      res.send({"error": "Failed to create a new recipe", "message": err.message})
    }
  })
}


/**
 * UPDATE Single POST
 * @param id
 */
exports.recette_update_post = (req, res) => {
  Recette.findById(req.params.id, (error, recette) => {
  if (error) {
      res.send(error);
  } else {
      recette.name = req.body.name;
      recette.temps = req.body.temps;
      recette.howto = req.body.howto;
      recette.ingredients = req.body.ingredients;

      recette.save((error) => {
      if (error) {
          res.send(error);
      } else {
          res.json({ message: "Recette updated successfully" });
      }
      });
  }
  });
}

/**
 * DELETE Single POST
 * @param id
 */
exports.recette_delete_post = (req, res) => {
    Recette.findByIdAndDelete(req.params.id, (err, recette) => {
        if(!err){
            res.status(200);
            res.send({"message": "Successfully removed", "recipe": recette});
        }
        else{
            res.status(400);
            res.send({"error": "Failed to delete", "message": err.message})
        }
    })
}