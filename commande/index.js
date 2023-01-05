import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import connectToDatabase from "./services/database/connect.js";
import Commande from "./models/Commande/Commande.js";
import axios from 'axios'


const app = express()
const port = process.env.PORT || 8000;

app.use(express.json())

//connect to database
await connectToDatabase()


app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('Hello world !!');
});
app.get('/commande/:id', (req,res) => {
  const id = req.params.id
  Commande.findById(id, (error,data) => {
    if(error) {
      res.status(400).json(error)
    }
    if(data) {
      res.status(200).json(data)
    }
  })
})
app.get('/commandes', (req,res) => {
  Commande.find((error,data) => {
    if(error) {
      res.status(400).json(error)
    }
    if(data) {
      res.status(200).json(data)
    }
  })
})
app.post('/commande', async (req,res) =>{
  let {client, plats, prix} = req.body
  console.log(client, plats, prix)

  plats = await Promise.all(plats.map(async plat => {
    console.log(plat)
    const _plat = await axios.get(`${process.env.RECETTE_URL}/recette/:${plat.id}`)
    //const _plat = await axios.get(`https://random-data-api.com/api/v2/beers`)
    return {
      recette : _plat.data,
      quantity : plat.quantity
    }
  }))

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
app.delete('/commande/:id', (req,res) => {
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
app.put('/commande/:id', async(req,res) => {
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
app.listen(port, () => {
  console.log('Server app listening on port ' + port);
});




