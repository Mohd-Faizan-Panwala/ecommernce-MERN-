const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const PORT = 3100
const app = express()
const cors = require("cors");
const connectDB = require("./Config/db")

dotenv.config()
connectDB()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use("/api/auth", require("./Routes/auth.routes"));
app.use("/api/test", require("./Routes/tes.route"));
app.use("/api/orders", require("./routes/orderRoutes"));



app.listen(PORT,()=>{console.log('server is running on',PORT)})