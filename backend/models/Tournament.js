const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    organizerContact: { type: String, required: true },
    status:{type:String,default:"pending"},
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
