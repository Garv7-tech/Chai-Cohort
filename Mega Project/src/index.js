import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: "./.env"
})
const PORT = process.env.PORT || 8000

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`))
            .catch((err) => {
                console.error("MongoDb Connection Error", err)
                process.exit(1) //Exit the process with failure status code 1
            })
    })
