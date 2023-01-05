db = db.getSiblingDB('admin')
db.auth('root', 'password')

db = db.getSiblingDB('recette')

db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'recette',
    },
  ],
});