const express = require("express");
const notesController = require("../controllers/notes");
const router = express.Router();
const checkAuth = require("../middleware/checkauth");

router.get("/", checkAuth, notesController.get_notes);
router.get("/:noteId", checkAuth, notesController.get_note);
router.post("/", checkAuth, notesController.create_note);
router.delete("/:noteId", checkAuth, notesController.delete_note);
router.patch("/:noteId", checkAuth, notesController.update_note);
module.exports = router;