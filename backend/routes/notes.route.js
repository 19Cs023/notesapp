import express from 'express';
import notes from '../models/notes';
import notesCtrl from '../controllers/notes.controller.js';
const router = express.Router();

router.route('/api/notes')
    .get(notesCtrl.list)
    .post(notesCtrl.create);

router.route('/api/notes/search')
    .get(notesCtrl.searchByTitle);

router.route('/api/notes/:notesId')
    .get(notesCtrl.read, notesCtrl.notesByID, notesCtrl.notesByTitle, notesCtrl.notesByDate, notesCtrl.notesByCategory)
    .put(notesCtrl.update)
    .delete(notesCtrl.remove);


export default router;