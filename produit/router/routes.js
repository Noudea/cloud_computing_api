const express = require("express")
const router = express.Router()


const produit_controller = require("../controllers/produitController")

router.get("/", produit_controller.index)

router.get("/produit/(:id)", produit_controller.produit_get_post)

router.get("/produit", produit_controller.produit_get_all_post)

router.post("/produit", produit_controller.produit_create_post)

router.patch("/produit/(:id)", produit_controller.produit_update_post)

router.delete("/produit/(:id)", produit_controller.produit_delete_post)


module.exports = router
