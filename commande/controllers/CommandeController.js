import Commande from '../models/Commande/Commande.js'
import axios from 'axios'

const CommandeController = {
  getCommandeById : (req,res) => {
    try {
      const id = req.params.id
      Commande.findById(id, async (error,commande) => {
        if(error) {
          res.status(400).json(error)
        }
        if(!commande) {
          res.status(404).json({message: 'Commande not found'})
        }
        if(commande) {
          let {plats} = commande
          plats = await Promise.all(plats.map(async plat => {
            const _plat = await axios.get(`http://recette_api:8001/recette/${plat.id}`)
            return {
              recette : _plat.data.recette,
              quantity : plat.quantity
            }
          }))
          commande.plats = plats
          return res.status(200).json(commande)
        }
      })
    } catch(error) {
      return res.status(500).json({error: error})
    }
  },
  getCommandes : (req,res) => {
    Commande.find(async (error,data) => {
      if(error) {
        res.status(400).json(error)
      }
      if(data) {
        const commandes = await Promise.all(data.map(async (commande) => {
          let {plats} = commande
          plats = await Promise.all(plats.map(async plat => {
            const _plat = await axios.get(`${process.env.RECETTE_URL}/recette/${plat.id}`)
            return {
              recette : _plat.data.recette,
              quantity : plat.quantity
            }
          }))
          commande.plats = plats
          return commande
        }))
        res.status(200).json(commandes)
      }
    })
  },
  createCommande : (req,res) => {
    let {client, plats, prix} = req.body

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
  },
  deleteCommande : async (req,res) => {
    try {
      const {id} = req.params
      const deletedCommande = await Commande.findByIdAndDelete(id)
      if(!deletedCommande) {
        return res.status(404).json({error : "Commande not found"})
      }
      res.status(200).json(deletedCommande)

    } catch (error) {
      return res.status(500).json(error)
    }
  },
  updateCommande : async(req,res) => {
    try {
      const {id} = req.params
      const {client, plats, prix} = req.body
      const commande = await Commande.findByIdAndUpdate(id, {
        client,
        plats,
        prix
      }, {new : true})
      if(!commande) {
        return res.status(404).json({error : "Commande not found"})
      }
      res.status(200).json(commande)
    } catch(error) {
      res.status(400).json(error)
    }
  }
}



export default CommandeController