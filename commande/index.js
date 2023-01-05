import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'
import connectToDatabase from "./services/database/connect.js";
import router from './router/index.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000;

app.use(express.json());

//connect to database
await connectToDatabase()

// router
app.use('/', router)


app.listen(port, () => {
  console.log('Server app listening on port ' + port);
});




