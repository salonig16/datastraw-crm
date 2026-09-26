import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Tickets', to: '/' },
      { label: 'New ticket', to: '/new' },
      { label: 'Search & filters', to: '/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help center', href: '#' },
      { label: 'API reference', href: '#' },
      { label: 'Release notes', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Datastraw', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact support', href: '#' },
    ],
  },
];

function SocialIcon({ path }) {
  return (
    <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-paper/70 hover:text-paper hover:border-white/40 transition-colors">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M4 18 L9 4" stroke="#C4924A" strokeWidth="2" strokeLinecap="round" />
                <path d="M11 18 L14 6" stroke="#C4924A" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 18 L17 10" stroke="#C4924A" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-display font-semibold text-paper text-base">Datastraw</span>
            </div>
            <p className="text-sm text-paper/60 leading-relaxed max-w-[200px]">
              Support ticketing, built for teams who'd rather ship than manage spreadsheets.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-paper mb-3">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) =>
                  link.to ? (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-paper/60 hover:text-paper transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-paper/60 hover:text-paper transition-colors">
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-paper/50 font-mono">
            © {new Date().getFullYear()} Datastraw Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            <SocialIcon path="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-7.3L4.1 22H1l8.1-9.3L.9 2H8l5 6.7L18.9 2z" />
            <SocialIcon path="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8.3 18.5H5.7v-9h2.6v9zM7 8.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.5 10.2h-2.6v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.8h-2.6v-9h2.5v1.2h.1c.35-.66 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v5.1z" />
            <SocialIcon path="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10z" />
          </div>
        </div>
      </div>
    </footer>
  );
}