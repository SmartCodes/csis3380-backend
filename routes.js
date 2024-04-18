const express = require("express")
const router  = express.Router()
const {getArts, getArt, createArt, updateArt, deleteArt} = require("./controller")


router.get("/api/arts", getArts )
router.get("/api/art/:id", getArt )
router.post("/api/art", createArt )
router.put("/api/art/:id", updateArt )
router.delete("/api/art/:id", deleteArt )

module.exports = router
