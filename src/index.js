import { DB_Name } from "./constant.js";
import dotenv from "dotenv"
import connectDb from "./db/index.js";
import {app} from './app.js'


// mostly we use app.use  mostly when we need middleware or a configuration setting
dotenv.config()

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8050 ,()=>{
        console.log(` Server is running on: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed ", err)
})


