const Ticket = require('../models/Ticket');

// POST /api/tickets
// Create a new ticket. ticket_id and created_at are generated server-side.
const createTicket = async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({
        error: 'customer_name, customer_email, subject and description are all required.',
      });
    }

    const ticket = await Ticket.create({
      customerName: customer_name,
      customerEmail: customer_email,
      subject,
      description,
    });

    res.status(201).json({
      ticket_id: ticket.ticketId,
      created_at: ticket.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create ticket.' });
  }
};

// GET /api/tickets?status=Open&search=jane
// Lists tickets, optionally filtered by status and/or a free-text search
// across name, email, ticket ID, subject and description.
const getTickets = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && ['Open', 'In Progress', 'Closed'].includes(status)) {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, 'i'); // case-insensitive partial match
      filter.$or = [
        { customerName: regex },
        { customerEmail: regex },
        { ticketId: regex },
        { subject: regex },
        { description: regex },
      ];
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    res.json(
      tickets.map((t) => ({
        ticket_id: t.ticketId,
        customer_name: t.customerName,
        subject: t.subject,
        status: t.status,
        created_at: t.createdAt,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tickets.' });
  }
};

// GET /api/tickets/:ticketId
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }

    res.json({
      ticket_id: ticket.ticketId,
      customer_name: ticket.customerName,
      customer_email: ticket.customerEmail,
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      created_at: ticket.createdAt,
      updated_at: ticket.updatedAt,
      notes: ticket.notes.map((n) => ({
        text: n.text,
        created_at: n.createdAt,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch ticket.' });
  }
};

// PUT /api/tickets/:ticketId
// Body: { status?, notes? }  -- notes is treated as a single new note to append.
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }

    const { status, notes } = req.body;

    if (status) {
      if (!['Open', 'In Progress', 'Closed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value.' });
      }
      ticket.status = status;
    }

    if (notes) {
      ticket.notes.push({ text: notes });
    }

    await ticket.save();

    res.json({ success: true, updated_at: ticket.updatedAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update ticket.' });
  }
};

module.exports = { createTicket, getTickets, getTicketById, updateTicket };
