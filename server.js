

require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

const routes = require("./routes");

app.use(express.json());
app.use(cors());

app.use("/", routes);

const runServer = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ArtList", {
            useUnifiedTopology: true
        });
        console.log("Connected to local MongoDB");

        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to local MongoDB:", error);
    }
};

runServer();
