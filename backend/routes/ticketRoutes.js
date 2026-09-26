const express = require('express');
const router = express.Router();
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
} = require('../controllers/ticketController');

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:ticketId', getTicketById);
router.put('/:ticketId', updateTicket);

module.exports = router;
