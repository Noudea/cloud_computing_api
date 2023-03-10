const express = require("express")
const router = express.Router()


const recette_controller = require("../controllers/recetteController")

router.get("/", recette_controller.index)

router.get("/recette/(:id)", recette_controller.recette_get_post)

router.get("/recette", recette_controller.recette_get_all_post)

router.post("/recette", recette_controller.recette_create_post)

router.patch("/recette/:id", recette_controller.recette_update_post)

router.delete("/recette/(:id)", recette_controller.recette_delete_post)


module.exports = router
