import express from "express";
import JamController from "../controllers/jamsController.js";

const router = express.Router()

router
    .get('/jams', JamController.listJams)
    .get('/jams/:id', JamController.listJamById)
    .post('/jams/create', JamController.createJam)
    .put('/jams/update/:id', JamController.updateJam)
    .put('/jams/addSongToJamPlayList/:id', JamController.addSongToJamPlayList)
    .put('/jam/:jamId/playList/:playlistItemId', JamController.updateSongById)
    .delete('/jams/:id', JamController.deleteJam)

export default router