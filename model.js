const mongoose = require("mongoose");

const artSchema = new mongoose.Schema({
    artName: { type: String },
    serial: { type: Number },
    src: { type: String, required: true },
    alt: { type: String },
    bids: [
        {
            user: { type: String, required: true },
            bid: { type: Number, required: true }
        }
    ]
}, { collection: "artrecords" });

const Art = mongoose.model("Art", artSchema);

module.exports = Art;
