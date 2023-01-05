import express from 'express'
import commandeRoutes from './commande/index.js'

const router = express.Router()
router.use('/', commandeRoutes)

export default router;