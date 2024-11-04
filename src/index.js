import mongoose from "mongoose";
// import express from "express";
import { DB_Name } from "./constant.js";
import dotenv from "dotenv"
import connectDb from "./db/index.js";

// const app = express();

dotenv.config()

connectDb()
