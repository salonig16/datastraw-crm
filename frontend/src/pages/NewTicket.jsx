import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api.js';

export default function NewTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await createTicket(form);
      navigate(`/tickets/${res.ticket_id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white border border-line rounded-lg p-6">
      <h1 className="font-display text-lg font-semibold text-ink mb-1">
        Create a new ticket
      </h1>
      <p className="text-sm text-inksoft mb-5">
        Log a customer issue so your team can track it through to close.
      </p>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Customer name
          </label>
          <input
            name="customer_name"
            required
            value={form.customer_name}
            onChange={handleChange}
            className="w-full border border-line rounded-md px-3 py-2 text-sm bg-paper/40 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Customer email
          </label>
          <input
            type="email"
            name="customer_email"
            required
            value={form.customer_email}
            onChange={handleChange}
            className="w-full border border-line rounded-md px-3 py-2 text-sm bg-paper/40 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Issue title
          </label>
          <input
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-line rounded-md px-3 py-2 text-sm bg-paper/40 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full border border-line rounded-md px-3 py-2 text-sm bg-paper/40 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full font-medium py-2.5 rounded-md hover:bg-accentdark transition-colors disabled:opacity-50 border border-blue-500 bg-blue-600 text-white"
        >
          {submitting ? 'Creating...' : 'Create ticket'}
        </button>
      </form>
    </div>
  );
}