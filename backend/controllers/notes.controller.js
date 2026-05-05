import Notes from '../models/notes.js';
import { catchAsync } from '../utils/catchAsync.js';
import { errorHandler } from '../middlewares/error.middleware.js';
import extend from 'lodash/extend.js';

const create = catchAsync(async (req, res, next) => {
    const notes = new Notes(req.body);
    try {
        await notes.save();
        res.status(201).json(notes);
} catch (error) {
    errorHandler(error, req, res, next);
}
});

const list = catchAsync(async (req, res, next) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

const notesByID = catchAsync(async (req, res, next, id) => {
    try {
        const notes = await Notes.findById(id);
        if (!notes) {
            return res.status(404).json({ error: "Notes not found" });
        }
        req.notes = notes;
        next();
    } catch (error) {
        errorHandler(error, req, res);
    }
});


//search notes by title
const searchByTitle = catchAsync(async (req, res, next) => {
    const { title } = req.query;
    try {
        const notes = await Notes.find({ title: { $regex: title, $options: 'i' } });
        res.json(notes);
    } catch (error) {
        errorHandler(error, req, res, next);
    }   
});


//all notes by title
const notesByTitle = catchAsync(async (req, res, next) => {
    const { title } = req.params;
    try {
        const notes = await Notes.find({ title: { $regex: title, $options: 'i' } });
        res.json(notes);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});


const notesByDate = catchAsync(async (req, res, next) => {
    const { date } = req.params;
    try {
        const notes = await Notes.find({ created: { $gte: new Date(date) } });
        res.json(notes);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

const notesByCategory = catchAsync(async (req, res, next) => {
    const { category } = req.params;
    try {
        const notes = await Notes.find({ category: { $regex: category, $options: 'i' } });
        res.json(notes);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

const update = catchAsync(async (req, res, next) => {
    try {
        let notes = req.notes;
        notes = extend(notes, req.body);
        await notes.save();
        res.json(notes);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});


const remove = catchAsync(async (req, res, next) => {
    try {
        const notes = req.notes;
        await notes.remove();
        res.json({ message: "Notes deleted successfully" });
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

const createNotesByUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    
    // Create the note, enforcing the specific user ID from the URL param
    const notes = new Notes({
        ...req.body,
        user: userId
    });
    
    try {
        await notes.save();
        res.status(201).json(notes);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

const read = (req, res) => {
    return res.json(req.notes);
};

export default {
    create,
    list,
    read,
    notesByID,
    searchByTitle,
    notesByTitle,
    notesByDate,
    notesByCategory,
    update,
    remove,
    createNotesByUser
};

