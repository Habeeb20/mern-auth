require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const connection = require("./dbconnect")
connection()
const authRoute = require("./route/auth");
const userRoute = require("./route/route")

app.use(express.json())
app.use(cors())

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute)



const port = process.env.PORT || 8080
app.listen(port, () => console.log("listening on port 8080"))