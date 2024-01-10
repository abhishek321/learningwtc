const mongoose = require("mongoose");

const userNotesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the name of the users collection
        index: true // Create an index on user_id
    },
    note: { type: String, required: true, max: 250 },
    publishedAt: { type: Date, default: Date.now }, // Set default to the current date and time
    tag: { type: String, required: true, max: 25, index: true }, // Create an index on tag
    channel: { type: String, required: true, max: 25, index: true } // Create an index on channel
});

// Create compound index on tag and channel
userNotesSchema.index({ tag: 1, channel: 1 });

const Note = mongoose.model('Note', userNotesSchema);

module.exports = Note;
