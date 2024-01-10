const noteModel = require("../models/notes");
const { validationResult } = require("express-validator");
exports.noteCreate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }
    try {
        const { tag, note, channel } = req.body;
        const authenticatedUser = req.user;
        // Check if the user with the provided email already exists
        const existingUser = await noteModel.findOne({ note: note, user_id: authenticatedUser._id });
        if (existingUser) {
            return res.status(400).json({ message: `Note with this ${authenticatedUser.firstName}  already exists` });
        }


        // Create a new user
        const newNote = new noteModel({
            user_id: authenticatedUser._id,
            note,
            tag,
            channel
        });

        // Save the user to the database
        await newNote.save();

        res.status(201).json({ message: 'Note created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.noteUpdate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }
    try {
        const { tag, note, channel } = req.body;
        const authenticatedUser = req.user;
        // Check if the user with the provided email already exists
        const existingUser = await noteModel.findOne({ _id: req.param.id, user_id: authenticatedUser._id });
        if (!existingUser) {
            return res.status(404).json({ message: `Note with this ${authenticatedUser.firstName}  does not exists` });
        }


        // Create a new user
        const updateNote = await noteModel.findByIdAndUpdate(req.param._id, { note, tag, channel }, { new: true });

        res.status(201).json({ message: 'Note updated successfully', note: updateNote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }
    try {
        const authenticatedUser = req.user;
        const existNote = await noteModel.findOne({ _id: req.param.id, user_id: authenticatedUser._id });
        if (!existNote) {
            return res.status(404).json({ message: 'Note does not found!' });
        }
        res.status(200).json({ notes: existNote });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.deletNote = async (req, res) => {
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const authenticatedUser = req.user;
        const noteDeleted = await noteModel.findOneAndDelete({ _id: req.param.id, user_id: authenticatedUser._id });
        if (!noteDeleted) {
            return res.status(404).json({ message: 'Note does not found!' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}