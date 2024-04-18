const Task = require("./model");

const getArts = async (req, res) => {
    try {
        const arts = await Task.find();
        res.json(arts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getArt = async (req, res) => {
    try {
        const art = await Task.findById(req.params.id);
        if (art == null) {
            return res.status(404).json({ message: "Art not found" });
        }
        res.json(art);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createArt = async (req, res) => {
    const art = new Task({
        artName: req.body.artName,
        serial: req.body.serial,
        src: req.body.src,
        alt: req.body.alt,
        bids: req.body.bids
    });
    try {
        const newArt = await art.save();
        res.status(201).json(newArt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateArt = async (req, res) => {
    try {
        const art = await Task.findById(req.params.id);
        if (art == null) {
            return res.status(404).json({ message: "Art not found" });
        }
        if (req.body.artName != null) {
            art.artName = req.body.artName;
        }
        if (req.body.serial != null) {
            art.serial = req.body.serial;
        }
        if (req.body.src != null) {
            art.src = req.body.src;
        }
        if (req.body.alt != null) {
            art.alt = req.body.alt;
        }
        if (req.body.bids != null) {
            art.bids = req.body.bids;
        }
        const updatedArt = await art.save();
        res.json(updatedArt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteArt = async (req, res) => {
    try {
        const {id} = req.params
        const art = await Task.findById(id);
        if (art == null) {
            return res.status(404).json({ message: "Art not found" });
        }
        await art.deleteOne({_id: id});
        res.json({ message: "Art deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getArts, getArt, createArt, updateArt, deleteArt };
