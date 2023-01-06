db = db.getSiblingDB('admin')
db.auth('root', 'password')

db = db.getSiblingDB('commande')

db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'commande',
    },
  ],
});

db.createCollection('commandes')
db.commandes.insertMany([
  { _id: ObjectId('63b8013f320f157dd9dd85a9'),
    prix: 10,
    client: "Dark Vador",
    plats: [{
      "id": "63b7fd97f3878cb57ba41624",
      "quantity": 2
    },
    {
      "id" : "63b7fd78ae382cd54bc1d957",
      "quantity" : 1
    }],
    created_at: new Date(), updated_at: new Date()
  },
  { _id: ObjectId('63b817dbddea262f18e820a7'),
    prix: 10,
    client: "Luke Skywalker",
    plats: [{
      "id": "63b7fd97f3878cb57ba41624",
      "quantity": 10
    }],
    created_at: new Date(), updated_at: new Date()
  }

])