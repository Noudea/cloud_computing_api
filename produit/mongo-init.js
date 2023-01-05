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