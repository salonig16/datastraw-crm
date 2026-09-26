import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import NewTicket from './pages/NewTicket.jsx';
import TicketDetail from './pages/TicketDetail.jsx';
import Footer from './components/Footer.jsx';

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 18 L9 4" stroke="#A8701F" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 18 L14 6" stroke="#A8701F" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 18 L17 10" stroke="#A8701F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header className="border-b border-line">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <Mark />
            <span className="font-display font-semibold text-lg tracking-tight">
              Datastraw <span className="text-accent">Support</span>
            </span>
          </Link>
          <Link
            to="/new"
            className="bg-ink text-paper text-sm font-medium px-4 py-2 rounded-md hover:bg-accentdark transition-colors border border-blue-500 bg-blue-600 text-white"
          >
            + New ticket
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewTicket />} />
          <Route path="/tickets/:ticketId" element={<TicketDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}






       
         