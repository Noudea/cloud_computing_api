import mongoose from "mongoose";

const CommandeSchema = new mongoose.Schema({
  plats : Array,
  client : String,
  prix : Number
},{
  timestamps: true
})

const Commande = mongoose.model('Commande',CommandeSchema)

export default Commande