const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProduitSchema = new Schema({
    id: ObjectId,
    name: String,
    price: String,
    stock: Number,
}
,{
    timestamps: true
})

module.exports = mongoose.model('Produit', ProduitSchema);