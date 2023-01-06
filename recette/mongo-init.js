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

db.createCollection('recettes')
db.recettes.insertMany(
  [
    {
      _id: ObjectId("63b7fd78ae382cd54bc1d957"),
      name: 'Poulet Maffe',
      temps: '1 heure 30 minutes',
      howto: 'Voici quelques instructions pour préparer le Poulet Maffe :\n' +
        '\n' +
        'Préchauffez votre four à 350°F (175°C).\n' +
        'Dans un grand bol, mélangez 1 tasse de beurre de cacahuète, 1 oignon en dés, 1 tasse de pâte de tomate, 1 cuillère à café de sel et 1 cuillère à café de poivre.\n' +
        'Étendre une fine couche du mélange de beurre de cacahuète sur le dessus d\'un poulet entier.\n' +
        'Placez le poulet dans une rôtissoire et faites-le cuire au four préchauffé pendant 1 heure 30 minutes, ou jusqu\'à ce que la température interne atteigne 165°F (74°C).\n' +
        'Laissez le poulet reposer pendant 10 minutes avant de le découper et de le servir.\n' +
        'Servez le Poulet Maffe avec les accompagnements de votre choix, comme du riz, des légumes ou une salade. Bon appétit !\n' +
        '\n',
      ingredients: ['63b7f5dde46aba773da10132', '63b7f5e4f910402878288240', '63b7f5eb7252674495458eed'],
      created_at: new Date(), updated_at: new Date()
    },
    {
      _id: ObjectId("63b7fd97f3878cb57ba41624"),
      name: 'Poulet Maffe',
      temps: '1 heure 30 minutes',
      howto: 'Portez une casserole d\'eau salée à ébullition et faites cuire les spaghettis selon les instructions de l\'emballage.\n' +  ' Dans un petit bol, fouettez ensemble les œufs et le parmesan. Mettez-les de côté.\n' +
        'Dans une grande poêle, faire cuire le bacon à feu moyen jusqu\'à ce qu\'il soit croustillant. Retirer le bacon de la poêle et le mettre de côté.\n' +
        'Dans la même poêle, faire chauffer l\'huile d\'olive à feu moyen. Ajouter l\'ail et le faire sauter jusqu\'à ce qu\'il soit odorant, environ 1 minute.\n' +
        'Égoutter les spaghettis cuits et les ajouter à la poêle avec l\'ail. Mélanger pour enrober les spaghettis dans l\'huile.\n' +
        'Ajouter le mélange d\'œufs et de fromage dans la poêle et remuer les spaghettis jusqu\'à ce que les œufs soient cuits et le fromage fondu.\n' +
        'Émiettez le bacon et saupoudrez-le sur le dessus des spaghettis. Servir chaud.',
      ingredients: ['63b7fc916c96a0cd7fe58c79', '63b7fc983dc00d2e53a81cc5', '63b7fc9f5a048bcb84b1e3ca'],
      created_at: new Date(), updated_at: new Date()
    }
  ]
);