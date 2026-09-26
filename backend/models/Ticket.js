const mongoose = require('mongoose');
const Counter = require('./Counter');

const noteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const ticketSchema = new mongoose.Schema(
  {
    ticketId: { type: String, unique: true, index: true }, // e.g. TKT-001
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
    notes: [noteSchema],
  },
  { timestamps: true } // adds createdAt, updatedAt
);

// Auto-generate a sequential, zero-padded ticket ID before saving a new ticket.
ticketSchema.pre('save', async function (next) {
  if (this.isNew && !this.ticketId) {
    const counter = await Counter.findByIdAndUpdate(
      'ticketId',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.ticketId = `TKT-${String(counter.seq).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
