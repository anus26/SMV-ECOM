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
import revenuerouter from "./src/routes/revenue.routes.js"
import adminrouter from './src/routes/admin.routes.js'
import webhookrouter from './src/routes/webhook.routes.js'

const app = express()
app.use("/api/v1/webhook",webhookrouter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:"https://frontend-smv-ecom.vercel.app/",
  credentials:true
}))
app.use(cookieParser())

connectDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/v1/user",router)
app.use("/api/v1/Product",productrouter)
app.use("/api/v1/order",orderRoutes)
app.use("/api/v1/category",categoryrouter)
app.use("/api/v1/revenue",revenuerouter)
app.use("/api/v1/admin",adminrouter)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
