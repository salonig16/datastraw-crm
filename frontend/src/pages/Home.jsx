import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTickets } from '../api.js';
import StatusBadge from '../components/StatusBadge.jsx';
import Avatar from '../components/Avatar.jsx';

const STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'Closed'];

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [counts, setCounts] = useState({ Open: 0, 'In Progress': 0, Closed: 0 });

  useEffect(() => {
    const timer = setTimeout(() => fetchTickets(), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  useEffect(() => {
    getTickets({}).then((all) => {
      setCounts({
        Open: all.filter((t) => t.status === 'Open').length,
        'In Progress': all.filter((t) => t.status === 'In Progress').length,
        Closed: all.filter((t) => t.status === 'Closed').length,
      });
    });
  }, [tickets.length]);

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTickets({
        search: search || undefined,
        status: status !== 'All' ? status : undefined,
      });
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {['Open', 'In Progress', 'Closed'].map((s) => (
          <div key={s} className="bg-white border border-line rounded-lg px-4 py-3">
            <p className="text-2xl font-display font-semibold text-ink">{counts[s]}</p>
            <p className="text-sm text-inksoft">{s}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, ticket ID, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-line rounded-md px-4 py-2.5 text-sm placeholder:text-inksoft/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
        <div className="flex bg-white border border-line rounded-md p-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                status === s ? 'bg-ink text-paper' : 'text-inksoft hover:bg-paper'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2">
          {error}
        </div>
      )}

      <div className="bg-white border border-line rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="px-4 py-3 font-medium text-inksoft">Ticket</th>
              <th className="px-4 py-3 font-medium text-inksoft">Customer</th>
              <th className="px-4 py-3 font-medium text-inksoft">Subject</th>
              <th className="px-4 py-3 font-medium text-inksoft">Status</th>
              <th className="px-4 py-3 font-medium text-inksoft">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-inksoft">
                  Loading tickets...
                </td>
              </tr>
            )}
            {!loading && tickets.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-inksoft">
                  No tickets match yet.{' '}
                  <Link to="/new" className="text-accent hover:underline">
                    Create the first one
                  </Link>
                  .
                </td>
              </tr>
            )}
            {!loading &&
              tickets.map((t) => (
                <tr key={t.ticket_id} className="hover:bg-paper/60 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      to={`/tickets/${t.ticket_id}`}
                      className="font-mono text-accent hover:underline"
                    >
                      {t.ticket_id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={t.customer_name} />
                      <span>{t.customer_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{t.subject}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-inksoft">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}