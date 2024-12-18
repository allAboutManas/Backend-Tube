import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/userRoute.js"
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json());

app.use(express.urlencoded({extended:true,limit:"16kb"}));

app.use(express.static("public"));

app.use(cookieParser());

app.use("/api/v1/user",userRouter)


export {app}

