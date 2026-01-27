import dotenv from 'dotenv'
dotenv.config()
import   express from 'express'
import connectDB from './src/Config/db.js'
import cors from 'cors'
import router from './src/routes/user.routes.js'
import cookieParser from 'cookie-parser'
import productrouter from './src/routes/prodcut.routes.js'
import orderRoutes from './src/routes/order.routes.js'
import categoryrouter from './src/routes/category.routes.js'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())

connectDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/v1/user",router)
app.use("/api/v1/Product",productrouter)
app.use("/api/v1/order",orderRoutes)
app.use("/api/v1/category",categoryrouter)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
