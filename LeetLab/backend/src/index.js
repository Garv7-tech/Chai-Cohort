import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// Routes Import
import authRoutes from "./routes/auth.routes.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8081

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello Guys welcome to leetlab🔥")
})

app.use("/api/v1/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})