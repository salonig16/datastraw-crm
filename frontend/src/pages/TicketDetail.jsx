import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTicket, updateTicket } from '../api.js';
import StatusBadge from '../components/StatusBadge.jsx';

const STATUS_OPTIONS = ['Open', 'In Progress', 'Closed'];

export default function TicketDetail() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  const fetchTicket = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTicket(ticketId);
      setTicket(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status) => {
    setSaving(true);
    try {
      await updateTicket(ticketId, { status });
      await fetchTicket();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSaving(true);
    try {
      await updateTicket(ticketId, { notes: noteText.trim() });
      setNoteText('');
      await fetchTicket();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-inksoft">Loading ticket...</p>;

  if (error && !ticket) {
    return (
      <div>
        <p className="text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2 mb-4">
          {error}
        </p>
        <Link to="/" className="text-accent hover:underline text-sm">
          ← Back to all tickets
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="text-accent hover:underline text-sm">
        ← Back to all tickets
      </Link>

      <div className="bg-white border border-line rounded-lg p-6 mt-4">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-xs text-inksoft">{ticket.ticket_id}</p>
            <h1 className="font-display text-xl font-semibold text-ink">
              {ticket.subject}
            </h1>
          </div>
          <StatusBadge status={ticket.status} />
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm mb-5">
          <div>
            <dt className="text-inksoft">Customer</dt>
            <dd className="text-ink">{ticket.customer_name}</dd>
          </div>
          <div>
            <dt className="text-inksoft">Email</dt>
            <dd className="text-ink">{ticket.customer_email}</dd>
          </div>
          <div>
            <dt className="text-inksoft">Created</dt>
            <dd className="font-mono text-xs text-ink">
              {new Date(ticket.created_at).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-inksoft">Last updated</dt>
            <dd className="font-mono text-xs text-ink">
              {new Date(ticket.updated_at).toLocaleString()}
            </dd>
          </div>
        </dl>

        <div className="mb-5">
          <dt className="text-inksoft text-sm mb-1">Description</dt>
          <p className="text-ink text-sm whitespace-pre-wrap leading-relaxed">
            {ticket.description}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-inksoft mb-1.5">
            Update status
          </label>
          <div className="flex gap-2">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                disabled={saving || ticket.status === s}
                onClick={() => handleStatusChange(s)}
                className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                  ticket.status === s
                    ? 'bg-ink text-paper border-ink'
                    : 'border-line text-inksoft hover:bg-paper'
                } disabled:opacity-50`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-ink mb-2">Notes</h2>
          <div className="space-y-2 mb-3">
            {ticket.notes.length === 0 && (
              <p className="text-sm text-inksoft">No notes yet.</p>
            )}
            {ticket.notes.map((n, i) => (
              <div
                key={i}
                className="bg-paper border border-line rounded-md px-3 py-2 text-sm"
              >
                <p className="text-ink">{n.text}</p>
                <p className="font-mono text-xs text-inksoft mt-1">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add an internal note..."
              className="flex-1 border border-line rounded-md px-3 py-2 text-sm bg-paper/40 focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-ink text-paper text-sm font-medium px-4 py-2 rounded-md hover:bg-accentdark transition-colors disabled:opacity-50"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}