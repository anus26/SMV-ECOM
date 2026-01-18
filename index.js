import dotenv from 'dotenv'
dotenv.config()
import   express from 'express'
import connectDB from './src/Config/db.js'


const app = express()
app.use(express.json())

connectDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
