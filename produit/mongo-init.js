db = db.getSiblingDB('admin')
db.auth('root', 'password')

db = db.getSiblingDB('produit')

db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'produit',
    },
  ],
});

db.createCollection('produits')
db.produits.insertMany([
  { _id: ObjectId('63b7f5dde46aba773da10132'), name: 'Poulet', price: '10€', stock: 10, created_at: new Date(), updated_at: new Date() },
  { _id: ObjectId('63b7f5e4f910402878288240'), name: 'Tomate', price: '2€', stock: 5, created_at: new Date(), updated_at: new Date()},
  { _id: ObjectId('63b7f5eb7252674495458eed'), name: 'Beurre de cacahuète', price: '5€', stock: 2, created_at: new Date(), updated_at: new Date() },
  { _id: ObjectId('63b7fc916c96a0cd7fe58c79'), name: 'spaghetti', price: '2€', stock: 20, created_at: new Date(), updated_at: new Date() },
  { _id: ObjectId('63b7fc983dc00d2e53a81cc5'), name: 'lardon', price: '5€', stock: 50, created_at: new Date(), updated_at: new Date() },
  { _id: ObjectId('63b7fc9f5a048bcb84b1e3ca'), name: 'oeuf', price: '1€', stock: 10, created_at: new Date(), updated_at: new Date() }
])