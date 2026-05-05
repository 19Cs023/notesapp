import express from 'express';
import notesCtrl from '../controllers/notes.controller.js';
const router = express.Router();

router.route('/api/notes')
    .get(notesCtrl.list)
    .post(notesCtrl.create);

router.route('/api/notes/search')
    .get(notesCtrl.searchByTitle);

router.route('/api/notes/title/:title')
    .get(notesCtrl.notesByTitle);

router.route('/api/notes/date/:date')
    .get(notesCtrl.notesByDate);

router.route('/api/notes/category/:category')
    .get(notesCtrl.notesByCategory);

router.route('/api/notes/user/:userId')
    .post(notesCtrl.createNotesByUser);

router.route('/api/notes/:notesId')
    .get(notesCtrl.read)
    .put(notesCtrl.update)
    .delete(notesCtrl.remove);

router.param('notesId', notesCtrl.notesByID);

export default router;