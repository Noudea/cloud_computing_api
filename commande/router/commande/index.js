import express from 'express'

import axios from 'axios'
import Commande from '../../models/Commande/Commande.js'

const router  = express.Router()

router.get('/commande/:id', async(req,res) => {
  const id = req.params.id

  Commande.findById(id, async (error,data) => {
    if(error) {
      res.status(400).json(error)
    }
    if(data) {
      let {plats} = data
      plats = await Promise.all(plats.map(async plat => {
        const _plat = await axios.get(`http://recette_api:8001/recette/${plat.id}`)
        return {
          recette : _plat.data.recette,
          quantity : plat.quantity
        }
      }))
      data.plats = plats
      console.log(data)
      res.status(200).json(data)
    }
  })
})

router.get('/commandes', (req,res) => {
  Commande.find((error,data) => {
    if(error) {
      res.status(400).json(error)
    }
    if(data) {
      res.status(200).json(data)
    }
  })
})

router.post('/commande', async (req,res) =>{
  let {client, plats, prix} = req.body
  console.log(client, plats, prix)

  const commande = new Commande({
    client,
    plats,
    prix
  })

  commande.save((error,data) => {
    if(error) {
      res.status(400).json(error)
    }
    if(data) {
      res.status(201).json(commande)
    }
  })
})

router.delete('/commande/:id', (req,res) => {
  const {id} = req.params
  Commande.findByIdAndDelete(id, (error,data) => {
    if(error) {
      console.log(error)
      res.status(400).json(error)
    }
    if(data) {
      res.status(200).json(data)
    }
  })
})

router.put('/commande/:id', async(req,res) => {
  const {id} = req.params
  let {client, plats, prix} = req.body

  plats = await Promise.all(plats.map(async plat => {
    console.log(plat)
    const _plat = await axios.get(`${process.env.RECETTE_URL}/recette/:${plat.id}`)
    //const _plat = await axios.get(`https://random-data-api.com/api/v2/beers`)
    return {
      recette : _plat.data,
      quantity : plat.quantity
    }
  }))

  Commande.findByIdAndUpdate(id, {client, plats, prix}, (error,data) => {
    if(error) {
      res.status(400).json(error)
    }
    if(data) {
      res.status(200).json(data)
    }
  })
})


export default router