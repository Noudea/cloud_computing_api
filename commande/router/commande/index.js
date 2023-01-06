import express from 'express'

import axios from 'axios'
import Commande from '../../models/Commande/Commande.js'
import CommandeController from '../../controllers/CommandeController.js'

const router  = express.Router()

router.get('/commande/:id',  CommandeController.getCommandeById)

router.get('/commandes', CommandeController.getCommandes)

router.post('/commande', CommandeController.createCommande)

router.delete('/commande/:id', CommandeController.deleteCommande)

router.patch('/commande/:id', CommandeController.updateCommande)

export default router